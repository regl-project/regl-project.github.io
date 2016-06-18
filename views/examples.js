var choo = require('choo')
var Editor = require('./components/editor')
var Back = require('./components/back')

module.exports = function (params, state, send) {
  var selection = state.app.location.split('?')[1]
  var back = Back()
  var editor = Editor(state.examples.list, selection)

  // awkward hack to prevent redrawing when loading subsscriptions

  if (state.docs.contents && Object.keys(state.comparisons.contents).length == 4) {
    return choo.view`
    <main>
      ${editor}
      ${back}
    </main>`
  } else {
    return choo.view`
    <main>
      ${back}
    </main>`
  }
}