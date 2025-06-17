/**
 * LRU Cache implementation
 */
export class LRUCache {
  /**
   * Create a new LRU Cache
   * @param {number} capacity - Maximum number of items to store
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * Get an item from the cache
   * @param {string} key - Cache key
   * @returns {*} Cache value or undefined if not found
   */
  get(key) {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * Put an item in the cache
   * @param {string} key - Cache key
   * @param {*} value - Value to store
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }

  /**
   * Clear the cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get the current size of the cache
   * @returns {number} Number of items in cache
   */
  size() {
    return this.cache.size;
  }
} 