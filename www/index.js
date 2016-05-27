var choo = require('choo')

var app = choo()

app.model({
  namespace: 'example',
  state: { selection: 'basic' },
  reducers: {
    update: function (action, state) {
      return { selection: action.payload }
    }
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