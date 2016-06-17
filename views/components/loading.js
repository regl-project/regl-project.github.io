var css = require('dom-css')

module.exports = function Loading () {
  var loading = document.createElement('div')
  loading.className = 'loading'
  loading.innerHTML = 'loading...'
  css(loading, {
    fontFamily: 'klartext_monolight',
    fontSize: '130%',
    position: 'absolute',
    left: '20px',
    top: '20px',
    backgroundColor: 'rgb(40,40,40)',
    padding: '10px',
    opacity: 0
  })

  return loading
}