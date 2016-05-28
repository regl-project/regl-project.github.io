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

module.exports = function (name) {

  var basecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'codemirror.css'))
  var themecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'base16-dark.css'))
  insertcss(basecss)
  insertcss(themecss)

  var container = document.createElement('div')
  container.id = 'editor'

  var iframe = document.createElement('iframe')

  css(container, {
    width: '600px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '0',
    right: '230px',
    fontSize: '90%',
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

  bundler.on('modules', function (data) {
    console.log(data)
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

  var sidebar = document.createElement('div')
  sidebar.id = 'sidebar'

  css(sidebar, {
    width: '200px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '0',
    right: '0',
    fontSize: '130%',
    opacity: 0.9,
    display: 'inline-block',
    backgroundColor: '#151515',
    fontFamily: 'klartext_monolight',
    padding: '10px',
    color: 'rgb(210,210,210)'
  })

  var examples = [
    'basic', 'batch', 'bunny', 'camera', 'dds', 'dynamic', 
    'elements', 'envmap', 'feedback', 'geomorph'
  ]

  var heading = document.createElement('div')
  heading.innerHTML = 'examples'
  css(heading, {
    paddingLeft: '10px',
    marginTop: '10px',
    marginBottom: '20px',
    fontSize: '130%'
  })
  sidebar.appendChild(heading)

  examples.forEach(function (name) {
    var item = document.createElement('div')
    item.className = 'example'
    item.innerHTML = name
    item.onclick = function () {
      fetch(name)
    }
    css(item, {
      paddingLeft: '10px',
      paddingBottom: '5px',
      paddingTop: '5px',
      cursor: 'pointer',
      fontSize: '90%'
    })
    sidebar.appendChild(item)
  })

  var loading = document.createElement('div')
  loading.className = 'loading'
  loading.innerHTML = 'loading...'
  css(loading, {
    fontFamily: 'klartext_monolight',
    fontSize: '130%',
    position: 'absolute',
    left: '20px',
    top: '20px',
    backgroundColor: 'rgb(40,40,40)',
    padding: '10px',
    opacity: 0
  })

  var button = document.createElement('div')
  css(button, {
    position: 'fixed',
    right: '10px',
    bottom: '10px',
    width: '50px',
    height: '50px',
    backgroundColor: 'rgb(40,40,40)',
    opacity: 0.7,
    color: 'white',
    fontSize: '400%',
    cursor: 'pointer'
  })

  var logo = document.createElement('span')
  logo.className = 'logo'
  logo.innerHTML = '<'
  css(logo, {
    position: 'fixed',
    right: '19px',
    bottom: '0px'
  })
  button.appendChild(logo)

  button.onclick = function () {
    if (sidebar.style.display == 'none') {
      css(sidebar, {display: 'inherit'})
      css(container, {display: 'inherit', pointerEvents: 'all'})
      css(logo, {transform: 'rotate(0deg)', right: '19px'})
    } else {
      css(sidebar, {display: 'none'})
      css(container, {display: 'none', pointerEvents: 'none'})
      css(logo, {transform: 'rotate(90deg)', right: '15px'})
    }
  }

  fetch(name)

  return choo.view`
  <div>
    ${sidebar}
    ${button}
    ${loading}
    ${container}
    ${demo}
  </div>`
}