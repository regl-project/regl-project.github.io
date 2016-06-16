var fs = require('fs')
var path = require('path')
var marked = require('marked')
var hl = require('highlight.js')
var insertcss = require('insert-css')
var request = require('browser-request')

var source = 'https://raw.githubusercontent.com/freeman-lab/regl/api-page/API.md'

module.exports = {
  namespace: 'docs',
  state: { contents: '', position: ''},
  subscriptions: [
    function (send) {
      console.log('fetching')
      marked.setOptions({
        highlight: function (code, lang) {
          var out = lang ? hl.highlight(lang, code) : hl.highlightAuto(code)
          return out.value
        }
      })
      var renderer = new marked.Renderer()
      renderer.link = function (href, none, text) {
        if (href.indexOf('#') > -1) {
          return '<a class="internal-link" href=' + href + '>' + text + '</a>'
        } else {
          return '<a href=' + href + '>' + text + '</a>'
        }
      }
      request(source, function (er, response, body) {
        console.log('got markdown')
        var markdown = marked(body, {renderer: renderer})
        send('docs:update', {payload: markdown})
      })
    }
  ],
  reducers: {
    update: function (action, state) {
      return { contents: action.payload , position: state.position }
    },
    move: function (action, state) {
      return { contents: state.contents, position: action.payload }
    }
  }
}