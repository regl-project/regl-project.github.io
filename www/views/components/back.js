var css = require('dom-css')

var button = document.createElement('a')
button.className = 'button'
button.href = '/'
css(button, {
  position: 'fixed',
  left: '10px',
  bottom: '10px',
  width: '50px',
  height: '50px',
  backgroundColor: 'rgb(40,40,40)',
  opacity: 0.7,
  color: 'white',
  fontSize: '400%',
  textAlign: 'center',
  cursor: 'pointer'
})

var logo = document.createElement('span')
logo.innerHTML = '<'
css(logo, {
  position: 'fixed',
  left: '15px',
  bottom: '0px'
})
button.appendChild(logo)

module.exports = button