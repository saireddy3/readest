/**
 * @typedef {import('@/types/view').FoliateView} FoliateView
 * @typedef {import('@/types/view').TTSGranularity} TTSGranularity
 * @typedef {import('./TTSClient.js').TTSClient} TTSClient
 * @typedef {import('./TTSClient.js').TTSMessageCode} TTSMessageCode
 * @typedef {import('./TTSClient.js').TTSVoice} TTSVoice
 */

import { WebSpeechClient } from './WebSpeechClient.js';
import { EdgeTTSClient } from './EdgeTTSClient.js';
import { TTSUtils } from './TTSUtils.js';

/**
 * @typedef {'stopped' | 'playing' | 'paused' | 'backward-paused' | 'forward-paused' | 'setrate-paused' | 'setvoice-paused'} TTSState
 */

export class TTSController extends EventTarget {
  /**
   * @type {TTSState}
   */
  state = 'stopped';
  
  /**
   * @type {FoliateView}
   */
  view;
  
  #nossmlCnt = 0;
  #currentSpeakAbortController = null;
  #currentSpeakPromise = null;

  ttsLang = '';
  ttsRate = 1.0;
  
  /**
   * @type {TTSClient}
   */
  ttsClient;
  
  /**
   * @type {TTSClient}
   */
  ttsWebClient;
  
  /**
   * @type {TTSClient}
   */
  ttsEdgeClient;
  
  /**
   * @type {TTSVoice[]}
   */
  ttsWebVoices = [];
  
  /**
   * @type {TTSVoice[]}
   */
  ttsEdgeVoices = [];

  /**
   * @param {FoliateView} view
   */
  constructor(view) {
    super();
    this.ttsWebClient = new WebSpeechClient();
    this.ttsEdgeClient = new EdgeTTSClient();
    this.ttsClient = this.ttsWebClient;
    this.view = view;
  }

  async init() {
    await this.ttsWebClient.init();
    const success = await this.ttsEdgeClient.init();
    if (success) {
      this.ttsClient = this.ttsEdgeClient;
    } else {
      this.ttsClient = this.ttsWebClient;
    }
    this.ttsWebVoices = await this.ttsWebClient.getAllVoices();
    this.ttsEdgeVoices = await this.ttsEdgeClient.getAllVoices();
  }

  async initViewTTS() {
    let granularity = this.view.language.isCJK ? 'sentence' : 'word';
    const supportedGranularities = this.ttsClient.getGranularities();
    if (!supportedGranularities.includes(granularity)) {
      granularity = supportedGranularities[0];
    }
    await this.view.initTTS(granularity);
  }

  /**
   * @param {string | undefined} ssml
   */
  async preloadSSML(ssml) {
    if (!ssml) return;
    const iter = await this.ttsClient.speak(ssml, new AbortController().signal, true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of iter);
  }

  /**
   * @param {number} count
   */
  async preloadNextSSML(count = 2) {
    const tts = this.view.tts;
    if (!tts) return;
    let preloaded = 0;
    for (let i = 0; i < count; i++) {
      const ssml = this.#preprocessSSML(tts.next());
      this.preloadSSML(ssml);
      if (ssml) preloaded++;
    }
    for (let i = 0; i < preloaded; i++) {
      tts.prev();
    }
  }

  /**
   * @param {string | undefined} ssml
   * @returns {string | undefined}
   */
  #preprocessSSML(ssml) {
    if (!ssml) return;
    ssml = ssml
      .replace(/[–—]/g, ',')
      .replace(/\.{3,}/g, '<break time="400ms"/>')
      .replace(/·/g, '<break time="200ms"/>');

    return ssml;
  }

  /**
   * @param {string | undefined | Promise<string>} ssml
   */
  async #speak(ssml) {
    await this.stop();
    this.#currentSpeakAbortController = new AbortController();
    const { signal } = this.#currentSpeakAbortController;

    this.#currentSpeakPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('TTS speak');
        this.state = 'playing';
        ssml = this.#preprocessSSML(await ssml);
        await this.preloadSSML(ssml);
        if (!ssml) {
          this.#nossmlCnt++;
          // FIXME: in case we are at the end of the book, need a better way to handle this
          if (this.#nossmlCnt < 10 && this.state === 'playing') {
            resolve();
            await this.view.next(1);
            await this.forward();
          }
          return;
        } else {
          this.#nossmlCnt = 0;
        }

        const iter = await this.ttsClient.speak(ssml, signal);
        let lastCode = 'boundary';
        for await (const { code, mark } of iter) {
          if (signal.aborted) {
            resolve();
            return;
          }
          if (mark && this.state === 'playing') {
            this.view.tts?.setMark(mark);
          }
          lastCode = code;
        }

        if (lastCode === 'end' && this.state === 'playing') {
          resolve();
          await this.forward();
        }
        resolve();
      } catch (e) {
        if (signal.aborted) {
          resolve();
        } else {
          reject(e);
        }
      } finally {
        this.#currentSpeakAbortController = null;
        this.#currentSpeakPromise = null;
      }
    });
    await this.#currentSpeakPromise.catch((e) => this.error(e));
  }

  /**
   * @param {string | Promise<string>} ssml
   */
  async speak(ssml) {
    await this.initViewTTS();
    this.#speak(ssml).catch((e) => this.error(e));
    this.preloadNextSSML();
  }

  play() {
    if (this.state !== 'playing') {
      this.start();
    } else {
      this.pause();
    }
  }

  async start() {
    await this.initViewTTS();
    const ssml = this.state.includes('paused') ? this.view.tts?.resume() : this.view.tts?.start();
    if (this.state.includes('paused')) {
      this.resume();
    }
    this.#speak(ssml);
    this.preloadNextSSML();
  }

  async pause() {
    this.state = 'paused';
    await this.ttsClient.pause().catch((e) => this.error(e));
  }

  async resume() {
    this.state = 'playing';
    await this.ttsClient.resume().catch((e) => this.error(e));
  }

  async stop() {
    if (this.#currentSpeakAbortController) {
      this.#currentSpeakAbortController.abort();
    }
    await this.ttsClient.stop().catch((e) => this.error(e));

    if (this.#currentSpeakPromise) {
      await this.#currentSpeakPromise.catch((e) => this.error(e));
    }
    this.state = 'stopped';
  }

  // goto previous sentence
  async backward() {
    await this.initViewTTS();
    if (this.state === 'playing') {
      await this.stop();
      this.#speak(this.view.tts?.prev());
    } else {
      await this.stop();
      this.#speak(this.view.tts?.prev());
    }
  }

  // goto next sentence
  async forward() {
    await this.initViewTTS();
    if (this.state === 'playing') {
      await this.stop();
      this.#speak(this.view.tts?.next());
    } else {
      await this.stop();
      this.#speak(this.view.tts?.next());
    }
  }

  /**
   * @param {string} lang
   */
  async setLang(lang) {
    this.ttsLang = lang;
    await this.ttsClient.setVoice('');
  }

  /**
   * @param {number} rate
   */
  async setRate(rate) {
    this.ttsRate = rate;
    await this.ttsClient.setRate(rate);
  }

  /**
   * @param {string} lang
   * @returns {Promise<TTSVoice[]>}
   */
  async getVoices(lang) {
    return this.ttsClient.getVoices(lang);
  }

  /**
   * @param {string} voiceId
   */
  async setVoice(voiceId) {
    const voices = this.ttsWebVoices.concat(this.ttsEdgeVoices);
    const voice = voices.find((v) => v.id === voiceId);
    if (voice) {
      TTSUtils.setPreferredVoice(
        this.ttsClient === this.ttsWebClient ? 'web-speech' : 'edge-tts',
        voice.lang,
        voiceId,
      );
      await this.ttsClient.setVoice(voiceId);
    }
  }

  getVoiceId() {
    return this.ttsClient.getVoiceId();
  }

  /**
   * @param {unknown} e
   */
  error(e) {
    console.error('TTS error:', e);
    this.dispatchEvent(new CustomEvent('error', { detail: e }));
  }

  async kill() {
    await this.stop();
    this.removeAllEventListeners();
  }
} 