/**
 * A queue implementation for managing asynchronous tasks
 */
export class Queue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  /**
   * Add a task to the queue
   * @param {Function} task - The task function to execute
   * @returns {Promise} Promise that resolves when the task completes
   */
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }

  /**
   * Run the next task in the queue
   * @private
   */
  async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift();
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.running = false;
  }
} 