
module.exports = (opts) -> new CubeIcon

class CubeIcon
  constructor: (opts) ->

    @container = document.createElement 'div'

    s = 16
    dz = s / 2

    @container.setAttribute 'style', "
-webkit-transform: translateZ( -100px) rotateX(-45deg) rotateY(-45deg);
position: absolute;
-webkit-transform-style: preserve-3d;
"

    faceTransforms = { # http://desandro.github.io/3dtransforms/docs/cube.html
      front:  "rotateY(   0deg ) translateZ( #{dz}px )"
      back:   "rotateX( 180deg ) translateZ( #{dz}px )"
      right:  "rotateY(  90deg ) translateZ( #{dz}px )"
      left:   "rotateY( -90deg ) translateZ( #{dz}px )"
      top:    "rotateX(  90deg ) translateZ( #{dz}px )"
      bottom: "rotateX( -90deg ) translateZ( #{dz}px )"
    }

    faces = Object.keys(faceTransforms)
    for faceName, i in faces
      face = document.createElement 'div'
      face.setAttribute 'style', "
-webkit-transform-style: preserve-3d;
-webkit-transform: #{faceTransforms[faceName]};
position: absolute;
border: 0.5px solid black;
width: #{s}px;
height: #{s}px;
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4y2OYmWb8/84U7/8gGhfGJg8TY8AlQchQGGYgRhGyYegGM5BiK7o8iM9Air+xegGbqcQahuICYm1EV8tArI24LGAgN/5R0gEl4cBAbujDA5EYDQQTErGKceYFcqMQwwXEBCZRYUDIIGQ+AHmcSKuZbPIVAAAAAElFTkSuQmCC);
"
      face.textContent = i

      @container.appendChild face


document.body.appendChild new CubeIcon().container
