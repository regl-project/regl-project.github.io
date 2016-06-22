module.exports = {
  namespace: 'app',
  state: {},
  subscriptions: [
    function catchLinks (send) {
      window.onclick = function (e) {
        var node = (function traverse (node) {
          if (!node) return
          if (node.localName !== 'a') return traverse(node.parentNode)
          if (node.href === undefined) return traverse(node.parentNode)
          if (window.location.host !== node.host) return traverse(node.parentNode)
          return node
        })(e.target)

        if (!node) return
        e.preventDefault()
        var href = node.href

        if (location.pathname !== node.pathname) {
          send('app:location', { location: href.replace(/#$/, '') })
          window.history.pushState(null, null, href)
        } else {
          window.location.hash = node.hash
          var el = document.querySelector(node.hash)
          console.log('el', el)
          window.scrollTo(0, el.offsetTop)
        }
      }
    }
  ]
}
