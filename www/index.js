const choo = require('choo')

const app = choo()

app.router(function (route) {
  return [
    route('/', require('./views/main')),
    route('/api', require('./views/api')),
    route('/comparisons', require('./views/comparisons')),
    route('/examples', require('./views/examples'))
  ]}
)

const tree = app.start()
document.body.appendChild(tree)