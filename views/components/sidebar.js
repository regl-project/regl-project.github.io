var domCss = require('dom-css')
var classed = require('element-class')
var examples = require('../html/examples')
var css = require('sheetify')
var html = require('choo/html')
var kebabCase = require('lodash.kebabcase')

const cssPrefix = css`
  :host {
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    font-size: 130%;
    opacity: 0.9;
    display: inline-block;
    background-color: #151515;
    font-family: klartext_monolight;
    padding: 10px;
    color: rgb(210, 210, 210);
    overflow-y: scroll
  }

  :host .heading {
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 130%;
  }

  :host .item {
    display: block;
    padding-left: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    cursor: pointer;
    font-size: 90%;
  }

  :host .selected {
    background: rgb(40, 40, 40);
  }

  :host .item:hover {
    background: rgb(40, 40, 40);
  }
`

module.exports = function Sidebar (selection, onclick) {
  return html`
    <div class='${cssPrefix}'>
      <div class='heading'>examples</div>
        ${examples.map(function(name) {
          var href = '/examples/' + kebabCase(name)
          var className = 'item'
          if (name === selection) {
            className += ' selected'
          }
          return html`
            <a
              href='${href}'
              class='${className}'>
              ${name}
            </a>
          `
      })}
    </div>
  `
}
