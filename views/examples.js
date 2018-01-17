var html = require('choo/html')
var Back = require('./components/back')
var Editor = require('./components/editor')
var editor = new Editor()

module.exports = function (state, emit) {
  return html`
    <div>
      ${editor.render(state, emit, state.params.selection)}
      ${Back()}
    </div>
  `
}
