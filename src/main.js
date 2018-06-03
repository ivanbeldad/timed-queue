const TimedQueue = require('./TimedQueue')

/**
 * @param {object} [options]
 * @param {number} [options.items]
 * @param {number} [options.time]
 */
const create = (options) => {
  const timedQueue = new TimedQueue(options)
  return { add: timedQueue.add.bind(timedQueue) }
}

module.exports = { create }
