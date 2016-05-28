var css = require('dom-css')

module.exports = function sidebar (onclick) {
  var examples = [
    'basic', 'batch', 'bunny', 'camera', 'dds', 'dynamic', 
    'elements', 'envmap', 'feedback', 'geomorph'
  ]
  
  var sidebar = document.createElement('div')
  sidebar.id = 'sidebar'

  css(sidebar, {
    width: '200px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '0',
    right: '0',
    fontSize: '130%',
    opacity: 0.9,
    display: 'inline-block',
    backgroundColor: '#151515',
    fontFamily: 'klartext_monolight',
    padding: '10px',
    color: 'rgb(210,210,210)'
  })

  var heading = document.createElement('div')
  heading.innerHTML = 'examples'
  css(heading, {
    paddingLeft: '10px',
    marginTop: '10px',
    marginBottom: '20px',
    fontSize: '130%'
  })
  sidebar.appendChild(heading)

  examples.forEach(function (name) {
    var item = document.createElement('div')
    item.className = 'example'
    item.innerHTML = name
    item.onclick = function () {
      onclick(name)
    }
    css(item, {
      paddingLeft: '10px',
      paddingBottom: '5px',
      paddingTop: '5px',
      cursor: 'pointer',
      fontSize: '90%'
    })
    sidebar.appendChild(item)
  })

  return sidebar
}