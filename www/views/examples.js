var choo = require('choo')
var Editor = require('./components/editor')
var Back = require('./components/back')

module.exports = function (params, state, send) {
  var selection = state.app.location.split('?')[1]
  var back = Back()
  var editor = Editor(state.examples.list, selection)

  if (state.docs.contents) {
    return choo.view`
    <main>
      ${editor}
      ${back}
    </main>`
  } else {
    return choo.view`
    <main>
    </main>`
  }
}