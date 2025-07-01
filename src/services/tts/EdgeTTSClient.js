/**
 * @typedef {import('@/types/view').TTSGranularity} TTSGranularity
 * @typedef {import('./TTSClient.js').TTSClient} TTSClient
 * @typedef {import('./TTSClient.js').TTSMessageEvent} TTSMessageEvent
 * @typedef {import('./TTSClient.js').TTSVoice} TTSVoice
 * @typedef {import('@/libs/edgeTTS.js').EdgeSpeechTTS} EdgeSpeechTTS
 * @typedef {import('@/libs/edgeTTS.js').EdgeTTSPayload} EdgeTTSPayload
 */


import { EdgeSpeechTTS } from '@/libs/edgeTTS.js';
import { parseSSMLLang, parseSSMLMarks } from '@/utils/ssml.js';
import { TTSUtils } from './TTSUtils.js';

export class EdgeTTSClient {
  #rate = 1.0;
  #pitch = 1.0;
  #voice = null;
  #currentVoiceLang = '';
  #voices = [];
  #edgeTTS;

  #audioElement = null;
  #isPlaying = false;
  #pausedAt = 0;
  #startedAt = 0;
  available = true;

  constructor() {
    this.#edgeTTS = new EdgeSpeechTTS();
  }

  async init() {
    this.#voices = EdgeSpeechTTS.voices;
    try {
      await this.#edgeTTS.create({
        lang: 'en',
        text: 'test',
        voice: 'en-US-AriaNeural',
        rate: 1.0,
        pitch: 1.0,
      });
      this.available = true;
    } catch {
      this.available = false;
    }
    return this.available;
  }

  /**
   * @param {string} lang
   * @param {string} text
   * @param {string} voiceId
   * @returns {EdgeTTSPayload}
   */
  getPayload = (lang, text, voiceId) => {
    return { lang, text, voice: voiceId, rate: this.#rate, pitch: this.#pitch };
  };

  /**
   * @param {string} ssml
   * @param {AbortSignal} signal
   * @param {boolean} [preload]
   */
  async *speak(ssml, signal, preload = false) {
    const { marks } = parseSSMLMarks(ssml);
    const lang = parseSSMLLang(ssml) || 'en';
    let voiceId = 'en-US-AriaNeural';
    if (!this.#voice || this.#currentVoiceLang !== lang) {
      const preferredVoiceId = TTSUtils.getPreferredVoice('edge-tts', lang);
      const preferredVoice = this.#voices.find((v) => v.id === preferredVoiceId);
      this.#voice = preferredVoice ? preferredVoice : (await this.getVoices(lang))[0] || null;
      this.#currentVoiceLang = lang;
    }
    if (this.#voice) {
      voiceId = this.#voice.id;
    }

    if (preload) {
      // preload the first 2 marks immediately and the rest in the background
      const maxImmediate = 2;
      for (let i = 0; i < Math.min(maxImmediate, marks.length); i++) {
        const mark = marks[i];
        await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId)).catch((err) => {
          console.warn('Error preloading mark', i, err);
        });
      }
      if (marks.length > maxImmediate) {
        (async () => {
          for (let i = maxImmediate; i < marks.length; i++) {
            const mark = marks[i];
            try {
              await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId));
            } catch (err) {
              console.warn('Error preloading mark (bg)', i, err);
            }
          }
        })();
      }

      yield {
        code: 'end',
        message: 'Preload finished',
      };

      return;
    } else {
      await this.stopInternal();
    }

    for (const mark of marks) {
      if (signal.aborted) {
        yield {
          code: 'error',
          message: 'Aborted',
        };
        break;
      }
      try {
        const blob = await this.#edgeTTS.createAudio(this.getPayload(lang, mark.text, voiceId));
        const url = URL.createObjectURL(blob);
        this.#audioElement = new Audio(url);
        const audio = this.#audioElement;
        audio.setAttribute('x-webkit-airplay', 'deny');
        audio.preload = 'auto';

        yield {
          code: 'boundary',
          message: `Start chunk: ${mark.name}`,
          mark: mark.name,
        };

        const result = await new Promise((resolve) => {
          const cleanUp = () => {
            audio.onended = null;
            audio.onerror = null;
            audio.pause();
            audio.src = '';
            URL.revokeObjectURL(url);
          };
          audio.onended = () => {
            cleanUp();
            if (signal.aborted) {
              resolve({ code: 'error', message: 'Aborted' });
            } else {
              resolve({ code: 'end', message: `Chunk finished: ${mark.name}` });
            }
          };
          audio.onerror = (e) => {
            cleanUp();
            console.warn('Audio playback error:', e);
            resolve({ code: 'error', message: 'Audio playback error' });
          };
          if (signal.aborted) {
            cleanUp();
            resolve({ code: 'error', message: 'Aborted' });
            return;
          }
          this.#isPlaying = true;
          audio.play().catch((err) => {
            cleanUp();
            console.error('Failed to play audio:', err);
            resolve({ code: 'error', message: 'Playback failed: ' + err.message });
          });
        });
        yield result;
      } catch (error) {
        if (error instanceof Error && error.message === 'No audio data received.') {
          console.warn('No audio data received for:', mark.text);
          yield {
            code: 'end',
            message: `Chunk finished: ${mark.name}`,
          };
          continue;
        }
        console.log('Error:', error);
        yield {
          code: 'error',
          message: error instanceof Error ? error.message : String(error),
        };
        break;
      }

      await this.stopInternal();
    }
  }

  async pause() {
    if (!this.#isPlaying || !this.#audioElement) return;
    this.#pausedAt = this.#audioElement.currentTime - this.#startedAt;
    await this.#audioElement.pause();
    this.#isPlaying = false;
  }

  async resume() {
    if (this.#isPlaying || !this.#audioElement) return;
    await this.#audioElement.play();
    this.#isPlaying = true;
    this.#startedAt = this.#audioElement.currentTime - this.#pausedAt;
  }

  async stop() {
    await this.stopInternal();
  }

  async stopInternal() {
    this.#isPlaying = false;
    this.#pausedAt = 0;
    this.#startedAt = 0;
    if (this.#audioElement) {
      this.#audioElement.pause();
      this.#audioElement.currentTime = 0;
      if (this.#audioElement?.onended) {
        this.#audioElement.onended(new Event('stopped'));
      }
      this.#audioElement = null;
    }
  }

  /**
   * @param {number} rate
   */
  async setRate(rate) {
    this.#rate = rate;
  }

  /**
   * @param {number} pitch
   */
  async setPitch(pitch) {
    this.#pitch = pitch;
  }

  /**
   * @param {string} voice
   */
  async setVoice(voice) {
    this.#voice = this.#voices.find((v) => v.id === voice) || null;
    if (this.#voice) {
      TTSUtils.setPreferredVoice('edge-tts', this.#voice.lang, voice);
    }
  }

  /**
   * @returns {Promise<TTSVoice[]>}
   */
  async getAllVoices() {
    return this.#voices;
  }

  /**
   * @param {string} lang
   * @returns {Promise<TTSVoice[]>}
   */
  async getVoices(lang) {
    const langCode = lang.toLowerCase().slice(0, 2);
    return this.#voices.filter((voice) => {
      const voiceLangCode = voice.lang.toLowerCase().slice(0, 2);
      return voiceLangCode === langCode;
    });
  }

  /**
   * @returns {TTSGranularity[]}
   */
  getGranularities() {
    return ['sentence'];
  }

  /**
   * @returns {string}
   */
  getVoiceId() {
    return this.#voice?.id || '';
  }
} 