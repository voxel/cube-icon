(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CubeIcon, expandName;

expandName = require('cube-side-array');

module.exports = function(opts) {
  return new CubeIcon(opts);
};

CubeIcon = (function() {
  function CubeIcon(opts) {
    var ch, cubeH, cubeW, cw, dz, face, faceFilters, faceName, faceTransforms, i, rotateX, rotateY, s, scale, shiftX, shiftY, showFaces, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (opts == null) {
      opts = {};
    }
    showFaces = (_ref = opts.showFaces) != null ? _ref : ['left', 'top', 'front'];
    if (opts.images != null) {
      _ref1 = expandName(opts.images, 'KRLTBF'), opts.back = _ref1[0], opts.right = _ref1[1], opts.left = _ref1[2], opts.top = _ref1[3], opts.bottom = _ref1[4], opts.front = _ref1[5];
    }
    if (opts.side != null) {
      opts.left = opts.front = opts.side;
    }
    rotateX = (_ref2 = opts.rotateX) != null ? _ref2 : -30;
    rotateY = (_ref3 = opts.rotateY) != null ? _ref3 : 45;
    scale = (_ref4 = opts.scale) != null ? _ref4 : 3.55;
    s = (_ref5 = opts.size) != null ? _ref5 : 16;
    this.container = document.createElement('div');
    cw = ch = 90;
    cubeW = Math.floor(ch / (1 - Math.sin(rotateX * Math.PI / 180)) - 2);
    cubeH = Math.ceil(cw / (1 + Math.cos(rotateY * Math.PI / 180)) + 1);
    shiftX = cw - s * scale - 5;
    shiftY = ch - s * scale + 5;
    this.container.setAttribute('style', "-webkit-transform: rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateX(" + shiftX + "px) translateY(" + shiftY + "px) scale3d(" + scale + "," + scale + "," + scale + "); transform: rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateX(" + shiftX + "px) translateY(" + shiftY + "px) scale3d(" + scale + "," + scale + "," + scale + "); -webkit-transform-origin: 0 0; transform-origin: 0 0; position: relative; -webkit-transform-style: preserve-3d; transform-style: preserve-3d;");
    dz = s / 2;
    faceTransforms = {
      front: "rotateY(   0deg ) translateZ( " + dz + "px )",
      back: "rotateX( 180deg ) translateZ( " + dz + "px )",
      right: "rotateY(  90deg ) translateZ( " + dz + "px )",
      left: "rotateY( -90deg ) translateZ( " + dz + "px )",
      top: "rotateX(  90deg ) translateZ( " + dz + "px )",
      bottom: "rotateX( -90deg ) translateZ( " + dz + "px )"
    };
    faceFilters = (_ref6 = opts.faceFilters) != null ? _ref6 : {
      front: 'brightness(60%)',
      left: 'brightness(100%)',
      top: 'brightness(150%)'
    };
    for (i = _i = 0, _len = showFaces.length; _i < _len; i = ++_i) {
      faceName = showFaces[i];
      face = document.createElement('div');
      face.setAttribute('style', "-webkit-transform-style: preserve-3d; transform-style: preserve-3d; -webkit-transform: " + faceTransforms[faceName] + "; transform: " + faceTransforms[faceName] + "; position: absolute; border: 0.5px solid black; width: " + s + "px; height: " + s + "px;");
      face.style.backgroundImage = 'url(' + opts[faceName] + ')';
      if (faceFilters[faceName]) {
        face.style.webkitFilter = faceFilters[faceName];
        face.style.filter = faceFilters[faceName];
      }
      this.container.style.webkitTransition = '-webkit-transform 1s';
      this.container.style.transition = '        transform 1s';
      this.container.appendChild(face);
    }
  }

  return CubeIcon;

})();


},{"cube-side-array":3}],2:[function(require,module,exports){
'use strict';

var CubeIcon = require('./');

var images = {
  dirt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4y2OYmWb8/84U7/8gGhfGJg8TY8AlQchQGGYgRhGyYegGM5BiK7o8iM9Air+xegGbqcQahuICYm1EV8tArI24LGAgN/5R0gEl4cBAbujDA5EYDQQTErGKceYFcqMQwwXEBCZRYUDIIGQ+AHmcSKuZbPIVAAAAAElFTkSuQmCC',
  stone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4y+1SsQ0AMAjidz/gYTu1MU2QprODE6CggmSqiohTCkMldAKF49fBxlGJt1A1kw66aXIHjuCi4DWvigN3JucC8wfzB2QuoGWkP++xVxEAAAAASUVORK5CYII=',
  grass_top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4y61TwREAIAiy/cdyGqao3qWIXQ8flgGimfmYhh1OAuQsvahAPQOoFCACUFkR5K2+wxbQMMyZApXxrJUZ8TIFBoRoCl8UdL2QHpSLpBanf+F1hJcCNP2AugckXwA2yZhbyqZNAAAAAElFTkSuQmCC',
  grass_side: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4y2NgOMz4n+ElEB/Gg1/iEcMpQchQGJ6ZZvyfEL4zxRsrG4QZkAXRJfEZBOMzEKsYF2bAZiqxhqG4gFgb0dUyEGsjLgsYSAk0bAHOgCt0yXYBqWHBQIwGggmJWMXY1DFQEoUYLiAmMIkKA0IGIfMBkw04/LuclggAAAAASUVORK5CYII='
};

//console.log({side:images.grass_side, top:images.grass_top});
//console.log({left:images.dirt, front:images.stone, top:images.grass_top});

document.body.appendChild(CubeIcon({side:images.dirt, top:images.dirt}).container);
// TODO: show additional cubes, offset properly
//document.body.appendChild(CubeIcon({side:images.grass_side, top:images.grass_top}).container);
//document.body.appendChild(CubeIcon({left:images.dirt, front:images.stone, top:images.grass_top}).container);
//document.body.appendChild(CubeIcon({images:[images.grass_top, null, images.dirt, images.stone]}).container);

},{"./":1}],3:[function(require,module,exports){
'use strict';

var expandName = function(name, order) {
  var array = new Array(6);

  // from voxel-mesher/ao-mesher -- also seen: 'KFTBLR' (voxel-texture), 'FKTBRL' (Mozilla's WebGL cube demo)
  order = order || 'RTFLBK';

  if (order.length !== 6) {
    throw new Error('expandName invalid order length: ' + order);
  }

  var back   = order.indexOf('K');
  var front  = order.indexOf('F');
  var top    = order.indexOf('T');
  var bottom = order.indexOf('B');
  var left   = order.indexOf('L');
  var right  = order.indexOf('R');

  if (back < 0 || front < 0 || top < 0 || bottom < 0 || left < 0 || right < 0) {
    throw new Error('expandName invalid order: ' + order);
  }

  if (!name || name.length === 0) {
    // empty
    array[back] = array[front] = array[top] = array[bottom] = array[left] = array[right] = undefined;
  } else if (name.top) {
    // explicit names
    array[back] = name.back;
    array[front] = name.front;
    array[top] = name.top;
    array[bottom] = name.bottom;
    array[left] = name.left;
    array[right] = name.right;
  } else if (!Array.isArray(name)) {
     // scalar is all
    array[back] = array[front] = array[top] = array[bottom] = array[left] = array[right] = name;
  } else if (name.length === 1) {
    // 0 is all
    array[back] = array[front] = array[top] = array[bottom] = array[left] = array[right] = name[0];
  } else if (name.length === 2) {
    // 0 is top/bottom, 1 is sides
    array[back] = array[front] = array[left] = array[right] = name[1];
    array[top] = array[bottom] = name[0];
  } else if (name.length === 3) {
    // 0 is top, 1 is bottom, 2 is sides
    array[back] = array[front] = array[left] = array[right] = name[2];
    array[top] = name[0];
    array[bottom] = name[1];
  } else if (name.length === 4) {
    // 0 is top, 1 is bottom, 2 is front/back, 3 is left/right
    array[back] = array[front] = name[2];
    array[top] = name[0];
    array[bottom] = name[1];
    array[left] = array[right] = name[3];
  } else if (name.length === 5) {
    // 0 is top, 1 is bottom, 2 is front, 3 is back, 4 is left/right
    array[back] = name[3];
    array[front] = name[2];
    array[top] = name[0];
    array[bottom] = name[1];
    array[left] = array[right] = name[4];
  } else if (name.length === 6) {
    throw new Error('expandName('+name+'): 6-element array support removed, use objects instead ({back:, front:, top:, bottom:, left:, right:...})');
  } else {
    throw new Error('expandName('+name+'): invalid side count array length '+name.length);
  }

  return array;
};

module.exports = expandName;


},{}]},{},[2])