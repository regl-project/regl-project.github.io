var choo = require('choo')
var back = require('./components/back')
var request = require('browser-request')
var marked = require('marked')
var css = require('dom-css')

module.exports = function (params, state, send) {

 var container = document.createElement('div')
 container.id ='text'
 css(container, {
    width: '650px', 
    height: window.innerHeight, 
    position: 'fixed',
    top: '50',
    left: '25px',
    fontSize: '80%',
    opacity: 0.9,
    display: 'inline-block',
    overflow: 'scroll'
  })

 var base = 'https://raw.githubusercontent.com/mikolalysenko/regl/gh-pages/API.md'
 var text = request(base, function(er, response, body) {
 	 var renderer = new marked.Renderer()
     renderer.heading = function (text, level) {
     var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

      return '<h' + level + '><a name="' +
                escapedText +
                 '" class="anchor" href="#' +
                 escapedText +
                 '"><span class="header-link"></span></a>' +
                  text + '</h' + level + '>';
},

console.log(marked(body, { renderer: renderer }));
 	 container.innerHTML=marked(body, { renderer: renderer })
 	 // container.innerHTML=marked(body)
     // console.log(marked(body))

})


  return choo.view`
  <main>
    <h1>api</h1>
    ${container}
    ${back()}
  </main>`
 }