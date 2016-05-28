var fs = require('fs')
var choo = require('choo')
var path = require('path')
var css = require('dom-css')
var insertcss = require('insert-css')
var codemirror = require('codemirror')
var request = require('browser-request')
var throttle = require('lodash.throttle')
var debounce = require('lodash.debounce')
require('codemirror/mode/javascript/javascript')
var sandbox = require('browser-module-sandbox')
var Sidebar = require('./sidebar')
var Toggle = require('./toggle')
var Loading = require('./loading')

module.exports = function (name) {

  var basecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'codemirror.css'))
  var themecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'base16-dark.css'))
  insertcss(basecss)
  insertcss(themecss)

  var container = document.createElement('div')
  container.id = 'editor'

  var iframe = document.createElement('iframe')

  css(container, {
    width: '650px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '0',
    right: '230px',
    fontSize: '80%',
    opacity: 0.9,
    display: 'inline-block'
  })

  var editor = codemirror(container, {
    autofocus: true, 
    mode: 'javascript', 
    theme: 'base16-dark',
    lineWrapping: true
  })

  var demo = document.createElement('div')
  demo.id = 'demo'

  css(demo, {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '-1000',
    background: 'black',
    pointerEvents: 'all'
  })

  var bundler = sandbox({
    name: 'demo',
    cdn: 'http://wzrd.in',
    container: demo,
    iframe: iframe
  })

  bundler.on('bundleEnd', function (data) {
    css(loading, {opacity: 0})
    css(demo, {display: 'inherit'})
  })

  function run () {
    bundler.bundle(editor.getValue(), {'regl': '0.5.0'})
  }

  var debounced = debounce(run, 250)

  editor.on('change', function (data) {
    debounced()
  })

  function fetch (name) {
    var base = 'https://raw.githubusercontent.com/mikolalysenko/regl/gh-pages/example/'
    var path = base + name + '.js'
    request(path, function(er, response, body) {
      body = body.replace('../regl', 'regl')
      editor.setValue(body)
    })
    css(loading, {opacity: 0.7})
    css(demo, {display: 'none'})
  }

  var sidebar = Sidebar(fetch)
  var toggle = Toggle()
  var loading = Loading()

  toggle.onclick = function () {
    if (sidebar.style.display == 'none') {
      css(sidebar, {display: 'inherit'})
      css(container, {display: 'inherit', pointerEvents: 'all'})
      css(toggle.children[0], {transform: 'rotate(0deg)', right: '19px'})
    } else {
      css(sidebar, {display: 'none'})
      css(container, {display: 'none', pointerEvents: 'none'})
      css(toggle.children[0], {transform: 'rotate(90deg)', right: '15px'})
    }
  }

  fetch(name)

  return choo.view`
  <div>
    ${sidebar}
    ${toggle}
    ${loading}
    ${container}
    ${demo}
  </div>`
}