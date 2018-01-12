var setStyle = require('dom-css')
var css = require('sheetify')
var html = require('choo/html')

var cssPrefix = css`
  :host {
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    background-color: rgb(40,40,40);
    opacity: 0.7,;
    color: white;
    font-size: 325%;
    cursor: pointer;
    letter-spacing: -16px;
  }

  .logo {
    position: fixed;
    right: 17px;
    bottom: 13px;
    transform: rotate(90deg);
  }

  .collapsed {
    transform: rotate(0deg);
    right: 27px;
    bottom: 7px;
  }
`

module.exports = function Toggle (state, emit) {
  var logoClass = 'logo'
  if (state.examples.isCollapsed) {
    logoClass += ' collapsed'
  }

  return html`
    <div class='${cssPrefix}' onclick='${toggle}'>
      <span class='${logoClass}'>|||</span>
    </div>
  `

  function toggle () {
    emit('examples:toggle')
  }
}
