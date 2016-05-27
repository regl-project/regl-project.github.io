var choo = require('choo')
var editor = require('./editor')
var sidebar = require('./sidebar')

module.exports = function (params, state, send) {
  var name = state.app.location.split('?')[1]
  var selection = state.example.selection

  console.log(name)
  console.log(selection)

  if (name) {
    return choo.view`
    <main>
      ${editor(name)}
    </main>`
  } else {
    return choo.view`
    <main>
      <a href='/examples/?basic'>basic</a>
      <a href='/examples/?camera'>camera</a>
    </main>`
  }
}