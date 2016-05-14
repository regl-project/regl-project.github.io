var choo = require('choo')

module.exports = function (params, state, send) {
  return choo.view`
  <main>
    <h1>regl</h1>
    <h2># functional and declarative webgl</h2>
    <a href='/api'>api</a>
    <a href='/comparisons'>comparisons</a>
    <a href='/examples'>examples</a>
  </main>`
}