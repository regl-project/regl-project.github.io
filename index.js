var choo = require('choo')
var redirect = require('choo-redirect')
var examplesStore = require('./store/examples')

var app = choo()

// app.use(require('choo-devtools')())
app.use(examplesStore)

app.route('/', require('./views/home'))
app.route('/api', require('./views/api'))
app.route('/examples', redirect('/examples/basic'))
app.route('/examples/:selection', require('./views/examples'))

var tree = app.start({ href: false })
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
