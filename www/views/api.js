var fs = require('fs')
var path = require('path')
var choo = require('choo')
var back = require('./components/back')
var request = require('browser-request')
var marked = require('marked')
var hl = require('highlight.js')
var css = require('dom-css')
var insertcss = require('insert-css')

module.exports = function (params, state, send) {

  var container = document.createElement('div')
  container.id ='text'
  container.className = 'markdown-body'
  css(container, {
    width: '65%', 
    height: window.innerHeight, 
    position: 'fixed',
    padding: '30px',
    top: '50',
    left: '0px',
    fontSize: '100%',
    opacity: 0.9,
    display: 'inline-block',
    overflow: 'scroll',
    background: 'rgb(30,30,30)',
    fontFamily: 'Helvetica'
  })

  var highlightcss = fs.readFileSync(path.join(__dirname, '..', 'lib', 'tomorrow-night.css'))
  insertcss(highlightcss)

  var base = 'https://raw.githubusercontent.com/mikolalysenko/regl/gh-pages/API.md'

  marked.setOptions({
    highlight: function (code, lang) {
      var out = lang ? hl.highlight(lang, code) : hl.highlightAuto(code)
      return out.value
    }
  })

  request(base, function (er, response, body) {
    container.innerHTML = marked(body)
  })

  return choo.view`
  <main>
    <h1>api</h1>
    ${container}
    ${back()}
  </main>`
 }