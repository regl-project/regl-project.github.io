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
    top: '250px',
    left: '0px',
    bottom: '100px',
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
    <div class='row' id='title'>
      <div class='hero'>
        <h1 align='right'>api</h1>
      </div>
      <div class='color-block-big green'>
      </div>
      <div>
    ${container}
    </div>
    <div>
    ${back()}
    </div>
  </main>`
 }