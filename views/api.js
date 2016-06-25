var fs = require('fs')
var path = require('path')
var choo = require('choo')
var back = require('./components/back')
var css = require('dom-css')
var onload = require('on-load')
var tocHeight = '100%'

module.exports = function (params, state, send) {
  var container = document.createElement('div')
  var tocWrapper = document.createElement('div')
  tocWrapper.className = 'toc'
  tocWrapper.innerHTML = state.docs.toc
  container.appendChild(tocWrapper)

  css(tocWrapper, {
    position: 'fixed',
    right: '60%',
    top: '0px',
    fontSize: '100%',
    color: 'rgb(190, 190, 190)',
    width: '20%',
    overflowY: 'scroll',
    margin: '0px 0px 30px 0px',
    height: tocHeight,
    background: 'rgb(30,30,30)',
    opacity: 0.9,
    paddingLeft: '10px'
  })

  onload(tocWrapper, function () {
    var toc = document.querySelector('.toc')
    tocHeight = (window.innerHeight - toc.offsetTop) + 'px'
    toc.style.height = tocHeight
  })

  var contentWrapper = document.createElement('div')
  contentWrapper.className = 'markdown-body'
  contentWrapper.innerHTML = state.docs.content
  contentWrapper.id = 'wrapper'
  container.appendChild(contentWrapper)

  css(contentWrapper, {
    width: '55%', 
    height: window.innerHeight - 60, 
    position: 'fixed',
    padding: '30px',
    top: '0px',
    right: '0px',
    opacity: 0.9,
    display: 'inline-block',
    overflow: 'scroll',
    background: 'rgb(30,30,30)'
  })

  return choo.view`
  <main>
    <div class='row' id='title'>
      <div class='hero-medium'>
        <h1 align='right'>api</h1>
      </div>
      <div class='color-block-medium green'>
      </div>
      <div>
        ${container}
      </div>
      <div>
        ${back()}
      </div>
    </div>
  </main>`
 }
