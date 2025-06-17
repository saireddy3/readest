/**
 * Event emitter class for handling custom events
 */
export class EventEmitter {
  constructor() {
    this.events = {};
    this.syncEvents = {};
  }

  /**
   * Add an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  /**
   * Add a synchronous event listener that can return a value
   * @param {string} event - Event name
   * @param {Function} callback - Event callback that returns a value
   */
  onSync(event, callback) {
    if (!this.syncEvents[event]) {
      this.syncEvents[event] = [];
    }
    this.syncEvents[event].push(callback);
  }

  /**
   * Remove an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback to remove
   */
  off(event, callback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  /**
   * Remove a synchronous event listener
   * @param {string} event - Event name
   * @param {Function} callback - Event callback to remove
   */
  offSync(event, callback) {
    if (!this.syncEvents[event]) return;
    this.syncEvents[event] = this.syncEvents[event].filter(cb => cb !== callback);
  }

  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {...*} args - Event arguments
   */
  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => {
      callback(...args);
    });
  }

  /**
   * Emit a synchronous event and return the first truthy result
   * @param {string} event - Event name
   * @param {...*} args - Event arguments
   * @returns {*} First truthy result from the callbacks, or undefined if none
   */
  emitSync(event, ...args) {
    if (!this.syncEvents[event]) return;
    for (const callback of this.syncEvents[event]) {
      const result = callback(...args);
      if (result) return result;
    }
  }

  /**
   * Remove all event listeners
   * @param {string} [event] - Optional event name to clear specific event
   */
  clear(event) {
    if (event) {
      delete this.events[event];
      delete this.syncEvents[event];
    } else {
      this.events = {};
      this.syncEvents = {};
    }
  }

  /**
   * Dispatch a custom event
   * @param {string} event - Event name
   * @param {*} detail - Event detail
   */
  dispatch(event, detail) {
    this.emit(event, { detail });
  }

  /**
   * Dispatch a synchronous custom event and return the result
   * @param {string} event - Event name
   * @param {*} detail - Event detail
   * @returns {*} Result from the first handler that returns a truthy value
   */
  dispatchSync(event, detail) {
    return this.emitSync(event, { detail });
  }
}

/**
 * Create a promise that can be resolved externally
 * @returns {Object} Object containing promise and resolve/reject functions
 */
export const createDeferredPromise = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

// Create a singleton instance of EventEmitter for global event handling
export const eventDispatcher = typeof window === 'undefined' ? null : new EventEmitter(); 