class QueueItem {
  /**
   *
   * @param {function} handler
   */
  constructor (handler) {
    this.handler = handler
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

module.exports = QueueItem
