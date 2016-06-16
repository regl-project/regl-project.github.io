var choo = require('choo')
var back = require('./components/back')
var css = require('dom-css')

module.exports = function (params, state, send) {

  console.log('rendering comparisonse')

  var container = document.createElement('div')
  container.id ='text'
  container.className = 'markdown-body'
  css(container, {
    width: '50%', 
    height: window.innerHeight, 
    position: 'fixed',
    padding: '30px',
    top: '0px',
    right: '0px',
    fontSize: '100%',
    opacity: 0.9,
    display: 'inline-block',
    overflow: 'scroll',
    background: 'rgb(30,30,30)',
    fontFamily: 'Helvetica'
  })


  return choo.view`
  <main>
    <div class='row' id='title'>
      <div class='hero-medium'>
        <h1 align='right'>comparisons</h1>
      </div>
      <div class='color-block-medium pink'></div>
    </div>
    <div>
    ${container}
    </div>
    ${back()}
  </main>`
}