var css = require('dom-css')

var test = document.body.appendChild(document.createElement('div'))
test.innerHTML = 'hello world'

css(test, {fontSize: '72px'})

setInterval(function () {
  console.log('rgb(0, 0, ' + Math.round(Math.random() * 255) + ')')
  css(test, {color: 'rgb(0, 0, ' + Math.round(Math.random() * 255) + ')'})
}, 500)
