var choo = require('choo')
var css = require('dom-css')

module.exports = function (send) {

  var container = document.createElement('div')
  container.id = 'sidebar'

  css(container, {
    width: '200px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '0',
    left: '0',
    fontSize: '110%',
    opacity: 0.9,
    display: 'inline-block',
    backgroundColor: 'rgb(90,90,90)'
  })

  var examples = ['basic', 'bunny']

  examples.forEach(function (name) {
    var item = document.createElement('div')
    item.innerHTML = name
    item.onclick = function () {
      send('example:update', { payload: name })
    }
    container.appendChild(item)
  })

  return choo.view`
  <div>
    ${container}
  </div>`
}