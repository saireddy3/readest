export class TTSUtils {
  static #LOCAL_STORAGE_KEY = 'ttsPreferredVoices';

  /**
   * @param {string} language
   * @returns {string}
   */
  static #normalizeLanguage(language) {
    if (!language) return 'n/a';
    return language.toLowerCase().slice(0, 2);
  }

  /**
   * @param {string} engine
   * @param {string} language
   * @param {string} voiceId
   */
  static setPreferredVoice(engine, language, voiceId) {
    if (!engine || !language || !voiceId) return;
    const preferences = this.#getPreferences();
    const lang = this.#normalizeLanguage(language);
    preferences[`${engine}-${lang}`] = voiceId;
    localStorage.setItem(this.#LOCAL_STORAGE_KEY, JSON.stringify(preferences));
  }

  /**
   * @param {string} engine
   * @param {string} language
   * @returns {string | null}
   */
  static getPreferredVoice(engine, language) {
    const preferences = this.#getPreferences();
    const lang = this.#normalizeLanguage(language);
    return preferences[`${engine}-${lang}`] || null;
  }

  /**
   * @returns {Record<string, string>}
   */
  static #getPreferences() {
    const storedPreferences = localStorage.getItem(this.#LOCAL_STORAGE_KEY);
    return storedPreferences ? JSON.parse(storedPreferences) : {};
  }
} 