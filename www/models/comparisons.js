var request = require('browser-request')
var extend = require('object-extend')

var source = 'https://raw.githubusercontent.com/mikolalysenko/regl/gh-pages/example/basic.js'
var list = ['threejs', 'webgl', 'regl', 'twgl']

module.exports = {
  namespace: 'comparisons',
  state: { list: list, selected: 'threejs', contents: {} },
  subscriptions: [
    function (send) {
      list.forEach(function (name) {
        request(source, function (er, response, body) {
          console.log('fetching:' + name)
          send('comparisons:update', {name: name, body: body})
        })
      })
    }
  ],
  reducers: {
    select: function (action, state) {
      return Object.assign(state, {selected: action.payload})
    },
    update: function (action, state) {
      var toadd = {}
      toadd[action.name] = action.body
      return Object.assign(state, 
        {contents: extend(state.contents, toadd)})
    },
  }
}