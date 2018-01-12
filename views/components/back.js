var css = require('sheetify')
var html = require('choo/html')

var cssPrefix = css`
  :host {
    position: fixed;
    left: 10px;
    bottom: 10px;
    width: 50px;
    height: 50px;
    background-color: rgb(40,40,40);
    opacity: 0.7;
    color: white;
    font-size: 400%;
    text-align: center;
    cursor: pointer;
  }

  :host span {
    position: fixed;
    left: 15px;
    bottom: 0px;
  }

  :host:hover {
    transition: background-color 100ms, color 100ms;
    background-color: white;
    color: rgb(40,40,40);
  }
`

module.exports = function Back () {

  return html`
    <a href='/' class='${cssPrefix}'>
      <span>${'<'}</span>
    </span>
  `
}
