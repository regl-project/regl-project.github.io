var choo = require('choo')

module.exports = function (params, state, send) {
  return choo.view`
  <main>
    <div class ='row' id='title'>
        <div class = 'myclass'>
            <h1 align = 'right'>regl</h1>
        </div>
        <div class ='colorblockblue'>
        </div>
    </div>
    <div class ='row'>
        <div class ='hashtag'>
            <h2># declarative and stateless WebGL</h2>
        </div>
    </div>
    <div class ='row'>
            <div class ="about"> 
            <h3>regl is a new set of functional abstracitons for working with WebGL.</h3>
            <h3>Compared to writing raw WebGL code, it offers the following advantages.</h3>
            <br>
            <h3> - less state</h3>
            <h3> - no binding</h3>
            <h3> - sane defaults</h3>
            <h3> - low overhead</h3>
            <br>
            <h3> follow the links below to learn more!</h3>
            </div>
    </div>
    <br>
    <div class ='row'>
        <a class = 'link' href='/examples'>gallery
        </a><div class ='colorblockorange'>
        </div><a class= 'secondlink' href='/comparisons'>comparisons
        </a><div class ='colorblockpink'>
        </div><a  class= 'secondlink' href='/api'>api
        </a><div class ='colorblockgreen'>
        </div>
    </div>
  </main>`
}