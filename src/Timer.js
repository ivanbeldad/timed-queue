const DEFAULT_INTERVAL = 100

class Timer {
  /**
   *
   * @param {object} options
   * @param {number} [options.interval] Check condition each "interval" time. Default 100ms.
   * @param {function} options.action
   */
  constructor (options) {
    this.interval = options.interval || DEFAULT_INTERVAL
    this.action = options.action
  }

  startIfStopped () {
    if (this.clock) return
    this.clock = setInterval(this.check.bind(this), this.interval)
  }

  stop () {
    if (!this.clock) return
    clearInterval(this.clock)
    this.clock = undefined
  }

  check () {
    this.action()
  }
}

module.exports = Timer
