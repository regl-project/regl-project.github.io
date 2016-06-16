var choo = require('choo')

var app = choo()

app.model(require('./models/docs'))
app.model(require('./models/examples'))

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
var highlightcss = fs.readFileSync(path.join(__dirname, 'lib', 'tomorrow-night.css'))
insertcss(basecss)
insertcss(markdowncss)
insertcss(highlightcss)
