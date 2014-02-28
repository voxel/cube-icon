
module.exports = (opts) -> new CubeIcon opts

class CubeIcon
  constructor: (opts) ->

    opts ?= {}

    showFaces = opts.showFaces ?
      #faces = ['back', 'right', 'left', 'top', 'bottom', 'front']
      #           0        1        2       3       4        5
      [                   'left', 'top',          'front']

    if opts.images? and Array.isArray(opts.images)
      # voxel-texture _expandName array/side convention
      a = opts.images
      opts.top = opts.side = '' if a.length == 0
      opts.top = opts.side = a[0] if a.length == 1    # one for all
      [opts.top, opts.side] = a if a.length == 2      # 0 is top/bottom, 1 is sides
      [opts.top, _ignored, opts.side] = a if a.length == 3    # 0 is top, 1 is bottom, 2 is sides
      [opts.top, _ignoredB, opts.front, opts.left] = a if a.length == 4 # 0 is top, 1 is bottom, 2 is front/back, 3 is left/right
      throw new Error('cube-icon images.length unrecognized 5') if a.length == 5
      [_ignoredBack, opts.front, opts.top, _ignoredBottom, opts.left, _ignoredRight] = a if a.length == 6
      throw new Error('cube-icon requires images.length <= 6') if a.length > 6


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


