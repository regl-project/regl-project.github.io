var request = require('browser-request')

module.exports = examplesStore

function examplesStore (state, emitter) {
  state.examples = {
    isCollapsed: false,
    isLoading: false,
    lastRequestId: 0,
    text: null,
  }

  emitter.on('examples:fetch', function (name) {
    var requestId = ++state.examples.lastRequestId
    state.examples.isLoading = true
    state.examples.text
    emitter.emit('render')

    // TODO - .env
    var base = 'http://localhost:8080/example/'
    var path = base + name + '.js'

    request(path, function(er, response, text) {
      if (requestId !== state.examples.lastRequestId) {
        return
      }
      // Search and replace some values to make them work in the editor.
      text = text.replace('../regl', 'regl')
      text = text.replace(new RegExp('assets/', 'g'), window.location.origin + '/assets/')
      state.examples.text = text
      state.examples.isLoading = false
      emitter.emit('render')
    })
  })

  emitter.on('examples:toggle', function() {
    state.examples.isCollapsed = !state.examples.isCollapsed
    emitter.emit('render')
  })
}
