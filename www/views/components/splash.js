var css = require('dom-css')
var mat4 = require('gl-mat4')
var normals = require('angle-normals')
var sphere = require('primitive-icosphere')
var perlin = require('noisejs')

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

  var mesh = sphere(7, {
    subdivisions: 3
  })

  var draw = regl({
    frag: `
    precision mediump float;
    uniform vec4 color;
    varying vec2 vuv;
    varying vec3 vposition;
    varying float vtime;
    vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b*cos( 6.28318*(c*t+d) );
    }
    void main () {
      vec3 a = vec3(0.5, 0.5, 0.5);
      vec3 b = vec3(0.5, 0.5, 0.5);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = (0.05 * abs(vposition));
      gl_FragColor = vec4(palette(sin(0.005 * vtime + 0.5), a, d, b, c), 1.0) * 1.5;
    }`,

    vert: `
    uniform mat4 projection;
    uniform mat4 model;
    uniform mat4 view;
    uniform sampler2D displacement;
    uniform float time;
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    varying vec2 vuv;
    varying vec3 vposition;
    varying float vtime;
    void main () {
      vuv = uv;
      vposition = position;
      vtime = time;
      vec3 displaced = position + normal * texture2D(displacement, uv).rgb * sin(0.005 * time) * 5.0;
      gl_Position = projection * view * model * vec4(displaced, 1.0);
    }`,

    attributes: {
      position: regl.buffer(mesh.positions),
      normal: regl.buffer(normals(mesh.cells, mesh.positions)),
      uv: regl.buffer(mesh.uvs)
    },

    elements: regl.elements(mesh.cells),

    primitive: 'lines',

    uniforms: {
      color: [1, 0, 0, 1],
      model: mat4.scale(mat4.identity([]), mat4.identity([]), [2, 1, 2]),
      view: function (props, context) {
        var t = 0.005 * context.count
        return mat4.lookAt([],
          [30 * Math.cos(t), 0, 30 * Math.sin(t)],
          [0, 0, 0],
          [0, 1, 0])
      },
      projection: function (props, context) {
        return mat4.perspective([],
          Math.PI / 4,
          context.viewportWidth / context.viewportHeight,
          0.01,
          1000)
      },
      time: function (props, context) {
        return context.count
      },
      displacement: regl.prop('displacement')
    }
  })

  var n = new perlin.Noise(Math.random())
  var dx = []
  var rnd
 
  for (var x = 0; x < 200; x++) {
    dx[x] = []
    for (var y = 0; y < 200; y++) {
      rnd = n.simplex2((x + 1) / 2, (y + 1) / 2)
      dx[x][y] = [rnd * 255, rnd * 255, rnd * 255]
    }
  }

  var displacement = regl.texture(dx)

  draw({displacement: displacement})

  // regl.frame(function (props, context) {
  //   regl.clear({
  //     depth: 1,
  //     color: [0, 0, 0, 1]
  //   })
  // })

  return canvas
}
