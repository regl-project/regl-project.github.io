#! /usr/bin/env node

var fs = require('fs')
var path = require('path')
var request = require('request')
var marked = require('marked')
var hl = require('highlight.js')
var domify = require('domify')
var jsdom = require('jsdom').jsdom()
var yo = require('yo-yo')

/*
* Build the API page of the site
*/

marked.setOptions({
  highlight: function (code, lang) {
    var out = lang ? hl.highlight(lang, code) : hl.highlightAuto(code)
    return out.value
  }
})

var document = jsdom.defaultView.document
var source = 'https://raw.githubusercontent.com/mikolalysenko/regl/gh-pages/API.md'
var filepath = path.join(__dirname, '..', 'views', 'html')
var counter = [0, 0, 0]
var toc

request(source, function (er, response, body) {
  var content = document.createElement('div')
  content.appendChild(domify(marked(body), document))
  parse(content)

  fs.writeFile(path.join(filepath, 'api-content.html'), content.innerHTML, function (err) {
    if (err) console.log(err)
    fs.writeFile(path.join(filepath, 'api-toc.html'), toc.outerHTML, function (err) {
      if (err) console.log(err)
    })
  })
})

function parse (node) {
  for (var i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i]

    if (child.tagName === 'UL' && !toc) {
      toc = child
      node.removeChild(child)
    }

    if (child.id === 'constructor') {
      if (counter[0] >= 0) child.id = 'constructor-' + counter[0]
      counter[0] += 1
    }

    if (child.id === 'update') {
      if (counter[1] >= 0) child.id = 'update-' + counter[1]
      counter[1] += 1
    }

    if (child.id === 'destroy') {
      if (counter[2] >= 0) child.id = 'destroy-' + counter[2]
      counter[2] += 1
    }

    parse(child)
  }
}
