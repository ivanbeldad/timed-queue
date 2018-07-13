# Timed Queue

<p align="center">
  <img src="logo/logo.png">
</p>

[![NPM Version](https://img.shields.io/npm/v/@ivanbeldad/timed-queue.svg)](https://www.npmjs.com/package/@ivanbeldad/timed-queue)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

Create a queue to limit async execution in time

## Examples

```javascript
// Execute 5 functions at the same time, but never more than 5 per second.
const queue = require('@ivanbeldad/timed-queue').create({ items: 5, time: 1000 })
```

### Promises approach example

```javascript
queue.add(myPromise)
  .then(result => console.log(`My result after completed! => ${result}`))
  .catch(error => console.error(`Oh no! After all the work it failed! => ${error}`))
```

### Async/Await approach example

```javascript
try {
  const result = await queue.add(myAsyncFunction)
  console.log(`My result after completed! => ${result}`))
} catch (error) {
  console.error(`Oh no! After all the work it failed! => ${error}`))
}
```

## License

Timed Queue is open-sourced software licensed under
the [MIT license](LICENSE).
