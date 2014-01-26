
module.exports = (opts) -> new CubeIcon

class CubeIcon
  constructor: (opts) ->

    @container = document.createElement 'div'
    @container.setAttribute 'style', "
-webkit-transform-style: preserve-3d;
-webkit-transform: translateX(6px) translateY(6px) rotateX(-15deg) rotateY(45deg);
width: 16px;
height: 16px;
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4y2OYmWb8/84U7/8gGhfGJg8TY8AlQchQGGYgRhGyYegGM5BiK7o8iM9Air+xegGbqcQahuICYm1EV8tArI24LGAgN/5R0gEl4cBAbujDA5EYDQQTErGKceYFcqMQwwXEBCZRYUDIIGQ+AHmcSKuZbPIVAAAAAElFTkSuQmCC);
"


document.body.appendChild new CubeIcon().container
