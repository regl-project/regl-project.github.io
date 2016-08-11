var css = require('dom-css')
var classed = require('element-class')

module.exports = function Sidebar (list, selection, onclick) {
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
    color: 'rgb(210,210,210)',
    overflowY: 'scroll'
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

  list.forEach(function (name) {
    var item = document.createElement('div')
    item.className = 'example'
    item.innerHTML = name
    item.onclick = function () {
      classed(document.querySelector('.example')).remove('example-selected')
      classed(document.querySelector('.example-selected')).remove('example-selected')
      onclick(name)
      classed(item).add('example-selected')
    }
    if (name === selection) classed(item).add('example-selected')
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