var choo = require('choo')
var back = require('./components/back')
var css = require('dom-css')
var request = require('browser-request')
var hl = require('highlight.js')

module.exports = function (params, state, send) {
  function main (code) {
    var container = document.createElement('div')
    container.id ='text'
    container.className = 'code-body'
    css(container, {
      width: '50%', 
      height: window.innerHeight, 
      position: 'fixed',
      padding: '30px',
      top: '0px',
      right: '0px',
      fontSize: '80%',
      opacity: 0.9,
      display: 'inline-block',
      overflow: 'scroll',
      background: 'rgb(30,30,30)',
      fontFamily: '12px Consolas, Courier, monospace'
    })
    var pre = document.createElement('pre')
    var block = document.createElement('code')
    container.appendChild(pre)
    pre.appendChild(block)
    if (code) {
      block.innerHTML = hl.highlight('js', code).value
    }
    return container
  }

  var examples = ['threejs', 'twgl', 'regl', 'webgl']
  var toggles = []
  examples.forEach(function (label, i) {
    var toggle = document.createElement('div')
    toggle.innerHTML = label
    toggle.className = 'switch'
    css(toggle, {
      width: '20%',
      height: '40px',
      top: i * 80 + 400,
      right: '50%',
      marginRight: '60px',
      background: 'rgb(30,30,30)',
      position: 'fixed',
      padding: '10px',
      paddingLeft: '20px',
      fontSize: '175%',
      fontFamily: 'klartext_monolight',
      cursor: 'pointer'
    })
    if (label === state.comparisons.selected) {
      css(toggle, {opacity: 0.9})
    } else {
      css(toggle, {opacity: 0.7})
    }
    toggles.push(toggle)
    toggle.onclick = function () {
      send('comparisons:select', {payload: label})
    }
  })

  var comparisons = state.comparisons.contents ? 
    state.comparisons.contents[state.comparisons.selected] :
    null

  return choo.view`
  <main>
    <div class='row' id='title'>
      <div class='hero-medium'>
        <h1 align='right'>comparisons</h1>
      </div>
      <div class='color-block-medium pink'></div>
    </div>
    <div>
    ${main(comparisons)}
    ${toggles}
    </div>
    ${back()}
  </main>`
}