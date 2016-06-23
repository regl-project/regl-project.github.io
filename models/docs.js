var fs = require('fs')
var path = require('path')
var insertcss = require('insert-css')
var request = require('browser-request')

module.exports = {
  namespace: 'docs',
  state: {
    toc: fs.readFileSync(path.join(__dirname, '..', 'views', 'html', 'api-toc.html')),
    content: fs.readFileSync(path.join(__dirname, '..', 'views', 'html', 'api-content.html'))
  },
  subscriptions: [],
  reducers: {
    update: function (action, state) {
      return { contents: action.payload }
    }
  }
}
