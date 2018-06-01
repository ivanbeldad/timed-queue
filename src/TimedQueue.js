const QueueItem = require('./QueueItem')
const Timer = require('./Timer')

const DEFAULT_ITEMS = 10
const DEFAULT_TIME = 1000

class TimedQueue {
  /**
   * @param {object} [options]
   * @param {number} [options.items]
   * @param {number} [options.time]
   * @param {Timer} [options.timer]
   */
  constructor (options) {
    const opts = options || {}
    this.items = opts.items || DEFAULT_ITEMS
    this.time = opts.time || DEFAULT_TIME
    /** @type {QueueItem[]} */
    this.queue = []
    this.executing = 0
    this.timer = opts.timer || new Timer({ action: this.check.bind(this) })
  }

  /**
   *
   * @param {function} handler
   */
  add (handler) {
    const queueItem = new QueueItem(handler)
    this.queue.push(queueItem)
    this.timer.startIfStopped()
    return queueItem.promise
  }

  /**
   * @return {boolean}
   */
  shouldExecute () {
    if (this.queue.length === 0) return false
    if (this.executing >= this.items) return false
    return true
  }

  /**
   * @return {boolean}
   */
  hasFinished () {
    return this.executing === 0 && this.queue.length === 0
  }

  check () {
    while (this.shouldExecute()) {
      this.execute()
    }
    if (this.hasFinished()) {
      this.timer.stop()
    }
  }

  async execute () {
    const queueItem = this.queue.shift()
    this.executing++
    try {
      const result = await queueItem.handler()
      queueItem.resolve(result)
    } catch (error) {
      queueItem.reject(error)
    } finally {
      setTimeout(() => this.executing--, this.time)
    }
  }
}

module.exports = TimedQueue
