/**
 * @typedef {import('@/types/view').TTSGranularity} TTSGranularity
 * @typedef {import('./TTSClient.js').TTSClient} TTSClient
 * @typedef {import('./TTSClient.js').TTSMessageEvent} TTSMessageEvent
 * @typedef {import('./TTSClient.js').TTSVoice} TTSVoice
 */


import { AsyncQueue } from '@/utils/queue.js';
import { findSSMLMark, parseSSMLLang, parseSSMLMarks } from '@/utils/ssml.js';
import { TTSUtils } from './TTSUtils.js';

const BLACKLISTED_VOICES = [
  'Albert',
  'Bad News',
  'Bahh',
  'Bells',
  'Boing',
  'Bubbles',
  'Cellos',
  'Eddy',
  'Flo',
  'Fred',
  'Good News',
  'Grandma',
  'Grandpa',
  'Jester',
  'Junior',
  'Kathy',
  'Organ',
  'Ralph',
  'Reed',
  'Rocko',
  'Sandy',
  'Shelley',
  'Superstar',
  'Trinoids',
  'Whisper',
  'Wobble',
  'Zarvox',
];

/**
 * @typedef {Object} TTSBoundaryEvent
 * @property {'boundary' | 'end' | 'error'} type
 * @property {boolean} speaking
 * @property {string} [name]
 * @property {string} [mark]
 * @property {number} [charIndex]
 * @property {number} [charLength]
 * @property {string} [error]
 */

/**
 * @param {string} ssml
 * @param {() => number} getRate
 * @param {() => number} getPitch
 * @param {() => SpeechSynthesisVoice | null} getVoice
 */
async function* speakWithBoundary(ssml, getRate, getPitch, getVoice) {
  const lang = parseSSMLLang(ssml);
  const { plainText, marks } = parseSSMLMarks(ssml);
  // console.log('ssml', ssml, marks);
  // console.log('text', plainText);

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(plainText);

  utterance.rate = getRate();
  utterance.pitch = getPitch();
  const voice = getVoice();
  if (voice) {
    utterance.voice = voice;
  }
  if (lang) {
    utterance.lang = lang;
  }

  const queue = new AsyncQueue();

  utterance.onboundary = (event) => {
    utterance.rate = getRate();
    utterance.pitch = getPitch();
    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    const mark = findSSMLMark(event.charIndex, marks);
    // console.log('boundary', event.charIndex, mark);
    queue.enqueue({
      type: 'boundary',
      speaking: true,
      name: event.name,
      mark: mark?.name ?? '',
      charIndex: event.charIndex,
      charLength: event.charLength,
    });
  };

  utterance.onend = () => {
    queue.enqueue({ type: 'end', speaking: false });
    queue.finish();
  };

  utterance.onerror = (event) => {
    queue.enqueue({ type: 'error', speaking: false, error: event.error });
    queue.finish();
  };

  synth.speak(utterance);

  while (true) {
    const ev = await queue.dequeue();
    if (ev === null) {
      break;
    }
    yield ev;
  }
}

/**
 * @param {string} ssml
 * @param {() => number} getRate
 * @param {() => number} getPitch
 * @param {() => SpeechSynthesisVoice | null} getVoice
 */
async function* speakWithMarks(ssml, getRate, getPitch, getVoice) {
  const { plainText, marks } = parseSSMLMarks(ssml);
  const lang = parseSSMLLang(ssml);

  const isCJK = (lang) => {
    const cjkLangs = ['zh', 'ja', 'kr'];
    if (lang && cjkLangs.some((cjk) => lang.startsWith(cjk))) return true;
    return /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(plainText);
  };

  if (!isCJK(lang)) {
    yield* speakWithBoundary(ssml, getRate, getPitch, getVoice);
    return;
  }

  const synth = window.speechSynthesis;

  const utterance = new SpeechSynthesisUtterance();
  for (const mark of marks) {
    utterance.text = mark.text;
    utterance.rate = getRate();
    utterance.pitch = getPitch();
    const voice = getVoice();
    if (voice) {
      utterance.voice = voice;
    }
    if (lang) {
      utterance.lang = lang;
    }

    yield {
      type: 'boundary',
      speaking: true,
      name: 'sentence',
      mark: mark.name,
    };

    const result = await new Promise((resolve) => {
      utterance.onend = () => resolve({ type: 'end', speaking: false });
      utterance.onerror = (event) =>
        resolve({
          type: 'error',
          speaking: false,
          error: event.error,
        });

      synth.speak(utterance);
    });

    yield result;
    if (result.type === 'error') {
      break;
    }
  }
}

export class WebSpeechClient {
  #rate = 1.0;
  #pitch = 1.0;
  #voice = null;
  #currentVoiceLang = '';
  #voices = [];
  #synth = window.speechSynthesis;
  available = true;

  async init() {
    if (!this.#synth) {
      this.available = false;
      return this.available;
    }
    await new Promise((resolve) => {
      const populateVoices = () => {
        this.#voices = this.#synth.getVoices();
        // console.log('Voices', this.#voices);
        if (this.#voices.length > 0) {
          resolve();
        }
      };

      if (this.#synth.getVoices().length > 0) {
        populateVoices();
      } else if (this.#synth.onvoiceschanged !== undefined) {
        this.#synth.onvoiceschanged = populateVoices;
      } else {
        resolve();
      }
    });
    return this.available;
  }

  /**
   * @param {string} ssml
   * @param {AbortSignal} signal
   * @param {boolean} [preload]
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async *speak(ssml, signal, preload = false) {
    const lang = parseSSMLLang(ssml);
    if (!this.#voice || this.#currentVoiceLang !== lang) {
      const preferredVoiceId = TTSUtils.getPreferredVoice('web-speech', lang);
      const preferredVoice = this.#voices.find((v) => v.name === preferredVoiceId);
      this.#voice = preferredVoice ? preferredVoice : (await this.getVoices(lang))[0] || null;
      this.#currentVoiceLang = lang;
    }

    const getRate = () => this.#rate;
    const getPitch = () => this.#pitch;
    const getVoice = () => this.#voice;

    yield* speakWithMarks(ssml, getRate, getPitch, getVoice);
  }

  async pause() {
    this.#synth.pause();
  }

  async resume() {
    this.#synth.resume();
  }

  async stop() {
    this.#synth.cancel();
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
   * @param {string} voiceId
   */
  async setVoice(voiceId) {
    this.#voice = this.#voices.find((v) => v.name === voiceId) || null;
    if (this.#voice) {
      TTSUtils.setPreferredVoice('web-speech', this.#voice.lang, voiceId);
    }
  }

  /**
   * @returns {Promise<TTSVoice[]>}
   */
  async getAllVoices() {
    return this.#voices
      .filter((voice) => {
        const isValidVoice = (id) => {
          const blacklisted = BLACKLISTED_VOICES.includes(id);
          return !blacklisted;
        };

        const isNotBlacklisted = (voice) => {
          return isValidVoice(voice.name);
        };

        return isNotBlacklisted(voice);
      })
      .map((voice) => ({
        id: voice.name,
        name: voice.name,
        lang: voice.lang,
        disabled: false,
      }));
  }

  /**
   * @param {string} lang
   * @returns {Promise<TTSVoice[]>}
   */
  async getVoices(lang) {
    const voices = await this.getAllVoices();
    const langCode = lang.toLowerCase().slice(0, 2);
    return voices.filter((voice) => {
      const voiceLangCode = voice.lang.toLowerCase().slice(0, 2);
      return voiceLangCode === langCode;
    });
  }

  /**
   * @returns {TTSGranularity[]}
   */
  getGranularities() {
    return ['word', 'sentence'];
  }

  /**
   * @returns {string}
   */
  getVoiceId() {
    return this.#voice?.name || '';
  }
} 