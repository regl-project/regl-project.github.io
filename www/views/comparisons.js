var choo = require('choo')
var back = require('./components/back')
var css = require('dom-css')

module.exports = function (params, state, send) {
  var container = document.createElement('div')
  container.id ='text'
  container.className = 'markdown-body'
  css(container, {
    width: '65%', 
    height: window.innerHeight, 
    position: 'fixed',
    padding: '30px',
    top: '250px',
    left: '0px',
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
      <div class='hero'>
        <h2 align='right'>comparisons</h2>
      </div>
      <div class='color-block-big pink'>
      </div>
      <div>
    ${container}
    </div>
    ${back()}
  </main>`
}