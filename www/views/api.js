var choo = require('choo')

module.exports = function (params, state, send) {
  return choo.view`
  <main>
    <h1>api</h1>
  </main>`
}