
module.exports = (opts) -> new CubeIcon

class CubeIcon
  constructor: (opts) ->

    opts ?= {}

    showFaces = opts.showFaces ?
      #faces = ['back', 'right', 'left', 'top', 'bottom', 'front']
      #           0        1        2       3       4        5
      [                   'left', 'top',          'front']

    if opts.side?
      opts.left = opts.front = opts.side

    scale = opts.scale ? 10

    s = opts.size ? 16

    shiftX = opts.shiftX ? s * Math.cos(45 * Math.PI/180)
    shiftY = opts.shiftY ? s

    @container = document.createElement 'div'

    ch = 26
    cw = 22

    @container.setAttribute 'style', "
X-webkit-transform: rotateX(-30deg) rotateY(45deg) scale3d(#{scale},#{scale},#{scale}) translateX(#{shiftX}px) translateY(#{shiftY}px);
-webkit-transform: rotateX(-30deg) rotateY(45deg) translateX(#{cw - s}px) translateY(#{ch - s}px);
-webkit-transform-origin: 0 0;
position: relative;
-webkit-transform-style: preserve-3d;
width: #{cw}px;
height: #{ch}px;
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

    for faceName, i in showFaces
      face = document.createElement 'div'
      face.setAttribute 'style', "
-webkit-transform-style: preserve-3d;
-webkit-transform: #{faceTransforms[faceName]};
position: absolute;
border: 0.5px solid black;
width: #{s}px;
height: #{s}px;"
      face.style.backgroundImage = 'url(' + opts[faceName] + ')'
      face.textContent = i

      @container.style.webkitTransition = '-webkit-transform 1s'
      #@container.style.webkitTransform = 'translateX(100px) translateY(100px) rotateX(-45deg) rotateY(45deg) scale3d(10,10,10)' # try changing in inspector!
      @container.appendChild face


dirt = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4y2OYmWb8/84U7/8gGhfGJg8TY8AlQchQGGYgRhGyYegGM5BiK7o8iM9Air+xegGbqcQahuICYm1EV8tArI24LGAgN/5R0gEl4cBAbujDA5EYDQQTErGKceYFcqMQwwXEBCZRYUDIIGQ+AHmcSKuZbPIVAAAAAElFTkSuQmCC'
stone = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4y+1SsQ0AMAjidz/gYTu1MU2QprODE6CggmSqiohTCkMldAKF49fBxlGJt1A1kw66aXIHjuCi4DWvigN3JucC8wfzB2QuoGWkP++xVxEAAAAASUVORK5CYII='
grass_top = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4y61TwREAIAiy/cdyGqao3qWIXQ8flgGimfmYhh1OAuQsvahAPQOoFCACUFkR5K2+wxbQMMyZApXxrJUZ8TIFBoRoCl8UdL2QHpSLpBanf+F1hJcCNP2AugckXwA2yZhbyqZNAAAAAElFTkSuQmCC'
grass_side = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4y2NgOMz4n+ElEB/Gg1/iEcMpQchQGJ6ZZvyfEL4zxRsrG4QZkAXRJfEZBOMzEKsYF2bAZiqxhqG4gFgb0dUyEGsjLgsYSAk0bAHOgCt0yXYBqWHBQIwGggmJWMXY1DFQEoUYLiAmMIkKA0IGIfMBkw04/LuclggAAAAASUVORK5CYII='

box = document.createElement 'div'
box.setAttribute 'style', 'border: 1px solid black;'
document.body.appendChild(box)

box.appendChild new CubeIcon(side:grass_side, top:grass_top).container
box.appendChild new CubeIcon(left:dirt, front:stone, top:grass_top).container
