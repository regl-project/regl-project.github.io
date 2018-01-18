var fs = require('fs')
var html = require('choo/html')
var path = require('path')
var setStyle = require('dom-css')
var insertcss = require('insert-css')
var CodeMirror = require('codemirror')
var debounce = require('lodash.debounce')
var sandbox = require('browser-module-sandbox')
require('codemirror/mode/javascript/javascript')
var Sidebar = require('./sidebar')
var Toggle = require('./toggle')
var Loading = require('./loading')
var css = require('sheetify')
var examples = require('../html/examples.json')
var Nanocomponent = require('nanocomponent')

var basecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'codemirror.css'))
var themecss = fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'cm-tomorrow-night.css'))
insertcss(basecss)
insertcss(themecss)

var cssPrefix = css`
  :host .codeMirrorWrapper {
    width: 650px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 230px;
    font-size: 80%;
    opacity: 0.9;
    display: inline-block;
  }

  :host .sandboxWrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1000;
    background: black;
    pointer-events: all;
  }
`

module.exports = Editor

function Editor () {
  if (!(this instanceof Editor)) return new Editor()
  this.selection = null
  this.text = null
  this.isBundled = false
  Nanocomponent.call(this)
}

Editor.prototype = Object.create(Nanocomponent.prototype)

Editor.prototype.update = function(state, emit, selection) {
  const text = state.examples.text

  // If the fetched text is different, update CodeMirror.
  if (text && text !== this.text) {
    this.codeMirror.setValue(text)
    this.text = text
  }

  // Fetch the example if it's not the same.
  if (selection !== this.selection) {
    emit('examples:fetch', selection)
    this.selection = selection
  }
  return true
}

Editor.prototype.setupThirdPartyLibraries = function() {
  // Create all the DOM elements
  var codeMirrorWrapper = html`<div class='codeMirrorWrapper'></div>`
  var sandboxWrapper = html`<div class='sandboxWrapper'></div>`

  // Setup the sandbox bundler
  var sandboxBundler = sandbox({
    name: 'sandbox-wrapper',
    cdn: 'http://wzrd.in',
    container: sandboxWrapper,
    iframeSandbox: ['allow-scripts', 'allow-same-origin']
  })

  sandboxBundler.on('bundleEnd', function (data) {
    self.isBundled = true
  })

  // Setup codemirror
  var codeMirror = CodeMirror(codeMirrorWrapper, {
    autofocus: true,
    mode: 'javascript',
    theme: 'tomorrow-night',
    lineWrapping: true
  })
  codeMirror.on('change', debounce(
    function run () {
      sandboxBundler.bundle(codeMirror.getValue(), {'regl': '1.3.0'})
    },
    250
  ))

  this.codeMirror = codeMirror
  this.codeMirrorWrapper = codeMirrorWrapper
  this.sandboxBundler = sandboxBundler
  this.sandboxWrapper = sandboxWrapper
}

Editor.prototype.getCodeMirrorWrapper = function() {
  if (!this.codeMirrorWrapper) {
    this.setupThirdPartyLibraries()
  }
  return this.codeMirrorWrapper
}

Editor.prototype.getSandboxWrapper = function() {
  if (!this.sandboxWrapper) {
    this.setupThirdPartyLibraries()
  }
  return this.sandboxWrapper
}

Editor.prototype.load = function() {
  this.emit('examples:fetch', this.selection)
}

Editor.prototype.createElement = function (state, emit, selection) {
  if (!selection) {
    throw new Error('An example must be selection')
  }
  var isLoading = state.examples.isLoading || !this.isBundled
  this.selection = selection
  this.emit = emit

  var hideWhenLoading = isLoading
    ? 'display: none'
    : ''

  var hideWhenCollapsed = state.examples.isCollapsed
    ? 'display: none'
    : ''
  var codeMirrorWrapper = this.getCodeMirrorWrapper()
  var sandboxWrapper = this.getSandboxWrapper()

  hideWhenLoading = ''
  hideWhenCollapsed = ''

  return html`
    <div class='${cssPrefix}'>
      <div style='${hideWhenCollapsed}'>
        ${Sidebar(selection)}
      </div>
      ${Toggle(state, emit)}
      ${Loading(isLoading)}
      <div style='${hideWhenLoading}'>
        <div style='${hideWhenCollapsed}'>
          ${codeMirrorWrapper}
        </div>
        ${sandboxWrapper}
      </div>
    </div>
  `
}
