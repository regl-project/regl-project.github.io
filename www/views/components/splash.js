var css = require('dom-css')

module.exports = function Splash () {
  var canvas = document.createElement('canvas')
  canvas.id = 'splash'

  css(canvas, {
    background: 'black',
    pointerEvents: 'none',
    zIndex: '-1000',
    position: 'absolute',
    top: 0,
    left: 0
  })

  function fit () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  fit()

  window.addEventListener('resize', fit, false)

  var regl = require('regl')(canvas)  

  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  })

  regl({
    frag: `
    precision mediump float;
    uniform vec4 color;
    void main () {
      gl_FragColor = color;
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
    void main () {
      gl_Position = vec4(position, 0, 1);
    }`,

    attributes: {
      position: regl.buffer([
        -1, 0,
        0, -1,
        1, 1])
    },

    uniforms: {
      color: [1, 0, 0, 1]
    },

    count: 3
  })()

  return canvas
}
