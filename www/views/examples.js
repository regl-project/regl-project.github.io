var choo = require('choo')
var editor = require('./components/editor')
var sidebar = require('./components/sidebar')
var back = require('./components/back')

module.exports = function (params, state, send) {
  var name = state.app.location.split('?')[1]
  name = name || 'basic'
  return choo.view`
  <main class='tmp'>
    ${editor(name)}
    ${back}
  </main>`
}