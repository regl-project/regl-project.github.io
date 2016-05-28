var choo = require('choo')
var back = require('./components/back')

module.exports = function (params, state, send) {
  return choo.view`
  <main>
    <h1>api</h1>
    ${back()}
  </main>`
}