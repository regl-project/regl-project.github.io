var choo = require('choo')

module.exports = function (params, state, send) {
  var name = state.location.split('?')[1]
  if (name) {
    return choo.view`
    <main>
      <h1>${name}</h1>
    </main>`
  } else {
    return choo.view`
    <main>
      <a href='/examples/?bunny'>bunny</a>
      <a href='/examples/?camera'>camera</a>
    </main>`
  }
}