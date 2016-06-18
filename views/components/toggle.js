var css = require('dom-css')

module.exports = function Toggle () {
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
    fontSize: '325%',
    cursor: 'pointer',
    letterSpacing: '-16px'
  })

  var logo = document.createElement('span')
  logo.className = 'logo'
  logo.innerHTML = '|||'
  css(logo, {
    position: 'fixed',
    right: '17px',
    bottom: '13px',
    transform: 'rotate(90deg)'
  })
  button.appendChild(logo)

  return button
}