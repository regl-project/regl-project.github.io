var fs = require('fs')
var path = require('path')
var choo = require('choo')
var back = require('./components/back')
var css = require('dom-css')
var insertcss = require('insert-css')

module.exports = function (params, state, send) {

  var hash = state.docs.position.split('#')[1] || state.app.location.split('#')[1]

  var container = document.createElement('div')
  css(container, {
    width: '65%', 
    height: window.innerHeight, 
    position: 'fixed',
    padding: '30px',
    top: '0',
    left: '0px',
    fontSize: '100%',
    opacity: 0.9,
    display: 'inline-block',
    overflow: 'scroll',
    background: 'rgb(30,30,30)',
    fontFamily: 'Helvetica'
  })

  var wrapper = document.createElement('div')
  wrapper.className = 'markdown-body'
  wrapper.innerHTML = state.docs.contents
  wrapper.id = 'wrapper'

  function descend (node) {
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i]
      if (child.className == 'internal-link') {
        child.onclick = function () {
          send('docs:move', {payload: child.href})
        }
      }
      descend(child)
    }
  }

  descend(wrapper)

  if (state.docs.contents) {
    container.appendChild(wrapper)
  }

  if (hash) {
    location.hash = hash
  }
  
  return choo.view`
  <main>
    <h1>api</h1>
    ${container}
    ${back()}
  </main>`
 }

