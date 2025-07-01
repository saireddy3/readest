/**
 * @typedef {import('@/types/view').TTSGranularity} TTSGranularity
 */

/**
 * @typedef {'boundary' | 'error' | 'end'} TTSMessageCode
 */

/**
 * @typedef {Object} TTSMessageEvent
 * @property {TTSMessageCode} code
 * @property {string} [message]
 * @property {string} [mark]
 */

/**
 * @typedef {Object} TTSVoice
 * @property {string} id
 * @property {string} name
 * @property {string} lang
 * @property {boolean} [disabled]
 */

/**
 * @typedef {Object} TTSClient
 * @property {function(): Promise<boolean>} init
 * @property {function(string, AbortSignal, boolean?): AsyncIterable<TTSMessageEvent>} speak
 * @property {function(): Promise<void>} pause
 * @property {function(): Promise<void>} resume
 * @property {function(): Promise<void>} stop
 * @property {function(number): Promise<void>} setRate
 * @property {function(number): Promise<void>} setPitch
 * @property {function(string): Promise<void>} setVoice
 * @property {function(): Promise<TTSVoice[]>} getAllVoices
 * @property {function(string): Promise<TTSVoice[]>} getVoices
 * @property {function(): TTSGranularity[]} getGranularities
 * @property {function(): string} getVoiceId
 */

export {}; 