const TimedQueue = require('./TimedQueue')

module.exports = {
  /**
   * @description Create a new Queue instance
   * @default options.items=10
   * @default options.time=1000
   * @param {object} [options]
   * @param {number} [options.items=10] The number of items that can run simultaneously
   * in the desired time.
   * @param {number} [options.time = 1000] Limit time in ms to execute the number of "items".
   * Set it to 0 to remove time limit.
   */
  create: (options) => {
    const timedQueue = new TimedQueue(options)
    return {
      add: (handler) => timedQueue.add(handler)
    }
  }
}
