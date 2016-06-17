# REGL API

* [Initialization](#initialization)
     - [As a fullscreen canvas](#as-a-fullscreen-canvas)
     - [From a container div](#from-a-container-div)
     - [From a canvas](#from-a-canvas)
     - [From a WebGL context](#from-a-webgl-context)
  + [Initialization options](#initialization-options)
* [Commands](#commands)
  + [Executing commands](#executing-commands)
    - [One-shot rendering](#one-shot-rendering)
    - [Batch rendering](#batch-rendering)
    - [Scoped commands](#scoped-commands)
  + [Inputs](#inputs)
    - [Context](#context)
    - [Props](#props)
    - [`this`](#-this-)
  + [Parameters](#parameters)
    - [Shaders](#shaders)
    - [Uniforms](#uniforms)
    - [Attributes](#attributes)
    - [Drawing](#drawing)
    - [Render target](#render-target)
    - [Depth buffer](#depth-buffer)
    - [Blending](#blending)
    - [Stencil](#stencil)
    - [Polygon offset](#polygon-offset)
    - [Culling](#culling)
    - [Front face](#front-face)
    - [Dithering](#dithering)
    - [Line width](#line-width)
    - [Color mask](#color-mask)
    - [Sample coverage](#sample-coverage)
    - [Scissor](#scissor)
    - [Viewport](#viewport)
* [Resources](#resources)
  + [Buffers](#buffers)
    - [Constructor](#constructor)
    - [Update](#update)
    - [Destroy](#destroy)
  + [Elements](#elements)
    - [Constructor](#constructor-1)
    - [Update](#update-1)
    - [Destroy](#destroy-1)
  + [Textures](#textures)
    - [Constructor](#constructor-2)
    - [Update](#update-2)
    - [Destroy](#destroy-2)
  + [Cube maps](#cube-maps)
    - [Constructor](#constructor-3)
    - [Update](#update-3)
    - [Destroy](#destroy-3)
  + [Render buffers](#render-buffers)
    - [Constructor](#constructor-4)
    - [Update](#update-4)
    - [Destroy](#destroy-4)
  + [Frame buffers](#frame-buffers)
    - [Constructor](#constructor-5)
    - [Update](#update-5)
    - [Destroy](#destroy-5)
  + [Cubic frame buffers](#cubic-frame-buffers)
    - [Constructor](#constructor-6)
    - [Update](#update-6)
    - [Destroy](#destroy-6)
* [Other features](#other-features)
  + [Clear the draw buffer](#clear-the-draw-buffer)
  + [Reading pixels](#reading-pixels)
  + [Per-frame callbacks](#per-frame-callbacks)
  + [Device capabilities and limits](#device-capabilities-and-limits)
  + [Performance metrics](#performance-metrics)
  + [Clean up](#clean-up)
  + [Context loss](#context-loss)
  + [Unsafe escape hatch](#unsafe-escape-hatch)
* [Tips](#tips)
  + [Reuse resources (buffers, elements, textures, etc.)](#reuse-resources--buffers--elements--textures--etc-)
  + [Preallocate memory](#preallocate-memory)
  + [Debug vs release](#debug-vs-release)
  + [Context loss mitigation](#context-loss-mitigation)

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
    position: [[0, -1], [-1, 0], [1, 1]]
  },

  count: 3
})
```

To execute a command you call it just like you would any function,

```javascript
drawTriangle()
```

---------------------------------------
