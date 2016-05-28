var css = require('dom-css')

module.exports = function toggle () {
  var button = document.createElement('div')
  button.className = 'button'
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

  return button
}