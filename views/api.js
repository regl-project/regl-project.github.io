var fs = require('fs')
var path = require('path')
var html = require('choo/html')
var back = require('./components/back')
var domCss = require('dom-css')
var onload = require('on-load')
var css = require('sheetify')

var TOC_HEIGHT = '100%'
var TOC_HTML = fs.readFileSync(path.join(__dirname, '..', 'views', 'html', 'api-toc.html'))
var CONTENT_HTML = fs.readFileSync(path.join(__dirname, '..', 'views', 'html', 'api-content.html'))

var cssPrefix = css`
  :host .api-toc {
    position: fixed;
    right: 60%;
    top: 0px;
    font-size: 100%;
    color: rgb(190, 190, 190);
    width: 20%;
    overflow-y: scroll;
    margin: 0px 0px 30px 0px;
    height: 100%;
    background: rgb(30,30,30);
    opacity: 0.9;
    padding-left: 10px;
  }

  :host .api-content {
    width: 55%;
    position: fixed;
    height: calc(100% - 60px);
    padding: 30px;
    top: 0px;
    right: 0p x;
    opacity: 0.9;
    display: inline-block;
    overflow: scroll;
    background: rgb(30,30,30);
  }
`

module.exports = function (params, state, send) {
  var toc = document.createElement('div')
  toc.className = 'api-toc'
  toc.innerHTML = TOC_HTML

  var content = document.createElement('div')
  content.className = 'api-content markdown-body'
  content.innerHTML = CONTENT_HTML

  return html`
    <main class='${cssPrefix}'>
      <div class='row' id='title'>
        <div class='hero-medium'>
          <h1 align='right'>api</h1>
        </div>
        <div class='color-block-medium green'>
        </div>
        <div>
          ${toc}
          ${content}
        </div>
        <div>
          ${back()}
        </div>
      </div>
    </main>
  `
 }
