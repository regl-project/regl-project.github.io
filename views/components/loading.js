var css = require('sheetify')
var html = require('choo/html')

var cssPrefix = css`
  :host {
    font-family: klartext_monolight;
    font-size: 130%;
    position: absolute;
    left: 20px;
    top: 20px;
    background-color: rgb(40,40,40);
    padding: 10px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 500ms;
  }
  :host.is-loading {
    opacity: 1;
  }
`

module.exports = function Loading (isLoading) {
  var className = cssPrefix + (
    isLoading ? '' : ' is-loading'
  )

  return html`
    <div class='${className}'>
      loading...
    </div>
  `
}
