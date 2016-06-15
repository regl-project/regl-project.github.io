var choo = require('choo')

var app = choo()

app.model({
  namespace: 'examples',
  state: { list: [
    'basic', 'batch', 'bunny', 'camera', 'dds', 'dynamic', 
    'elements', 'envmap', 'feedback', 'geomorph', 'life',
    'lighting', 'mipmap', 'particles', 'scope', 'text',
    'texture', 'theta360', 'tile', 'video'
    ] 
  }
})

app.router(function (route) {
  return [
    route('/', require('./views/main')),
    route('/api', require('./views/api')),
    route('/comparisons', require('./views/comparisons')),
    route('/examples', require('./views/examples'))
  ]}
)

var tree = app.start()
document.body.appendChild(tree)

var fs = require('fs')
var path = require('path')
var insertcss = require('insert-css')
var basecss = fs.readFileSync(path.join(__dirname, 'style.css'))
var markdowncss = fs.readFileSync(path.join(__dirname, 'lib', 'markdown-style.css'))
insertcss(basecss)
insertcss(markdowncss)