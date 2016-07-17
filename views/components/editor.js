var fs = require('fs')
var choo = require('choo')
var path = require('path')
var css = require('dom-css')
var insertcss = require('insert-css')
var codemirror = require('codemirror')
var request = require('browser-request')
var debounce = require('lodash.debounce')
var sandbox = require('browser-module-sandbox')
require('codemirror/mode/javascript/javascript')
var Sidebar = require('./sidebar')
var Toggle = require('./toggle')
var Loading = require('./loading')

var selected = 'basic'

module.exports = function Editor (list, selection) {

  var basecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'codemirror.css'))
  var themecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'cm-tomorrow-night.css'))
  insertcss(basecss)
  insertcss(themecss)

  if (selection) selected = selection

  var container = document.createElement('div')
  container.id = 'editor'

  var iframe = document.createElement('iframe')
  iframe.id = 'iframe'

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
    theme: 'tomorrow-night',
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
    iframe: iframe,
    iframeSandbox: ['allow-scripts', 'allow-same-origin']
  })

  bundler.on('bundleEnd', function (data) {
    css(loading, {opacity: 0})
    css(demo, {display: 'inherit'})
  })

  function run () {
    bundler.bundle(editor.getValue(), {'regl': '0.8.0'})
  }

  var debounced = debounce(run, 250)

  editor.on('change', function (data) {
    debounced()
  })

  function fetch (name) {
    selected = name
    var base = 'https://raw.githubusercontent.com/mikolalysenko/regl/d91f4bef665795f2f74f5854efcc7257ba678c54/example/'
    var path = base + name + '.js'
    request(path, function(er, response, body) {
      body = body.replace('../regl', 'regl')
      body = body.replace(new RegExp('assets/', 'g'), window.location.origin + '/assets/')
      editor.setValue(body)
    })
    css(loading, {opacity: 0.7})
    css(demo, {display: 'none'})
  }

  var sidebar = Sidebar(list, selected, fetch)
  var toggle = Toggle()
  var loading = Loading()

  toggle.onclick = function () {
    if (sidebar.style.display == 'none') {
      css(sidebar, {display: 'inherit'})
      css(container, {display: 'inherit', pointerEvents: 'all'})
      css(toggle.children[0], {transform: 'rotate(90deg)', right: '17px', bottom: '13px'})
    } else {
      css(sidebar, {display: 'none'})
      css(container, {display: 'none', pointerEvents: 'none'})
      css(toggle.children[0], {transform: 'rotate(0deg)', right: '27px', bottom: '7px'})
    }
  }

  fetch(selected)

  return choo.view`
  <div>
    ${sidebar}
    ${toggle}
    ${loading}
    ${container}
    ${demo}
  </div>`
}