var choo = require('choo')

module.exports = function (params, state, send) {
  return choo.view`
  <main>
    <h1>comparisons</h1>
  </main>`
}