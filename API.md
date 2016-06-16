# REGL API

* [Initialization](#initialization)
* [Commands](#commands)

---------------------------------------
## Initialization

##### As a fullscreen canvas
By default calling `module.exports` on the `regl` package creates a full screen canvas element and WebGLRenderingContext.

```javascript
var regl = require('regl')([options])
```

##### From a container div
Alternatively passing a container element as the first argument appends the generated canvas to its children.

```javascript
var regl = require('regl')(element, [options])
```

##### From a canvas
If the first argument is an HTMLCanvasElement, then `regl` will use this canvas to create a new WebGLRenderingContext that it renders into.

```javascript
var regl = require('regl')(canvas, [options])
```

##### From a WebGL context
Finally, if the first argument is a WebGLRenderingContext, then `regl` will just use this context without touching the DOM at all.

```javascript
var regl = require('regl')(gl, [options])
```

Note that this form is compatible with [`headless-gl`](https://github.com/stackgl/headless-gl) and can be used to do offscreen rendering in node.js. For example,

```javascript
//Creates a headless 256x256 regl instance
var regl = require('regl')(require('gl')(256, 256))
```

### Initialization options

**TODO**

---------------------------------------
## Commands

*Draw commands* are the fundamental abstraction in `regl`.  A draw command wraps up all of the WebGL state associated with a draw call (either `drawArrays` or `drawElements`) and packages it into a single reusable function. For example, here is a command that draws a triangle,

```javascript
const drawTriangle = regl({
  frag: `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,

  vert: `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0, 1);
  }`,

  attributes: {
    position: regl.buffer([[0, -1], [-1, 0], [1, 1]])
  },

  count: 3
})
```

To execute a command you call it just like you would any function,

```javascript
drawTriangle()
```
---------------------------------------
