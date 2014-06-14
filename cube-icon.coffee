
expandName = require 'cube-side-array'

module.exports = (opts) -> new CubeIcon opts

class CubeIcon
  constructor: (opts) ->

    opts ?= {}

    showFaces = opts.showFaces ?
      #faces = ['back', 'right', 'left', 'top', 'bottom', 'front']
      #           0        1        2       3       4        5
      [                   'left', 'top',          'front']

    if opts.images?
      # expand from scalar or array or object to each face image
      [opts.back, opts.right, opts.left, opts.top, opts.bottom, opts.front] = expandName(opts.images, 'KRLTBF')

    if opts.side?
      opts.left = opts.front = opts.side

    rotateX = opts.rotateX ? -30
    rotateY = opts.rotateY ? 45
    scale = opts.scale ? 3.55

    s = opts.size ? 16

    @container = document.createElement 'div'

    #cw = Math.ceil(s * (1 - Math.sin(rotateX * Math.PI/180))) * scale
    #ch = Math.ceil(s * (1 + Math.cos(rotateY * Math.PI/180))) * scale
   
    cw = ch = 90

    cubeW = Math.floor(ch / ((1 - Math.sin(rotateX * Math.PI/180))) - 2)
    cubeH = Math.ceil(cw / ((1 + Math.cos(rotateY * Math.PI/180))) + 1)

    shiftX = cw - s * scale   - 5
    shiftY = ch - s * scale   + 5

    #console.log(cw,s,cubeW,shiftX)
    #console.log(ch,s,cubeH,shiftY)

    @container.setAttribute 'style', "
-webkit-transform: rotateX(#{rotateX}deg) rotateY(#{rotateY}deg) translateX(#{shiftX}px) translateY(#{shiftY}px) scale3d(#{scale},#{scale},#{scale});
        transform: rotateX(#{rotateX}deg) rotateY(#{rotateY}deg) translateX(#{shiftX}px) translateY(#{shiftY}px) scale3d(#{scale},#{scale},#{scale});
-webkit-transform-origin: 0 0;
        transform-origin: 0 0;
position: relative;
-webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
"

    dz = s / 2
    faceTransforms = { # http://desandro.github.io/3dtransforms/docs/cube.html
      front:  "rotateY(   0deg ) translateZ( #{dz}px )"
      back:   "rotateX( 180deg ) translateZ( #{dz}px )"
      right:  "rotateY(  90deg ) translateZ( #{dz}px )"
      left:   "rotateY( -90deg ) translateZ( #{dz}px )"
      top:    "rotateX(  90deg ) translateZ( #{dz}px )"
      bottom: "rotateX( -90deg ) translateZ( #{dz}px )"
    }

    faceFilters = opts.faceFilters ? {
      front: 'brightness(60%)'
      left: 'brightness(100%)'
      top: 'brightness(150%)'
    }

    for faceName, i in showFaces
      face = document.createElement 'div'
      face.setAttribute 'style', "
-webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
-webkit-transform: #{faceTransforms[faceName]};
        transform: #{faceTransforms[faceName]};
position: absolute;
border: 0.5px solid black;
width: #{s}px;
height: #{s}px;"
      face.style.backgroundImage = 'url(' + opts[faceName] + ')'
      if faceFilters[faceName]
        face.style.webkitFilter = faceFilters[faceName]
        face.style.      filter = faceFilters[faceName]  # for future support (note: unsupported in Firefox 27; see https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Gecko_notes)

      @container.style.webkitTransition = '-webkit-transform 1s'
      @container.style.      transition = '        transform 1s'
      @container.appendChild face


