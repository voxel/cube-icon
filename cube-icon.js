'use strict';

const expandName = require('cube-side-array');

module.exports = (opts) => new CubeIcon(opts);

class CubeIcon {
  constructor(opts) {

    if (!opts) opts = {};

    const showFaces = opts.showFaces !== undefined ? opts.showFaces :
      //faces = ['back', 'right', 'left', 'top', 'bottom', 'front']
      //           0        1        2       3       4        5
      [                   'left', 'top',          'front'];

    if (opts.images !== undefined) {
      // expand from scalar or array or object to each face image
      const xn = expandName(opts.images, 'KRLTBF');
      opts.back = xn[0];
      opts.right = xn[1];
      opts.left = xn[2];
      opts.top = xn[3];
      opts.bottom = xn[4];
      opts.front = xn[5];
    }

    if (opts.side !== undefined) {
      opts.left = opts.front = opts.side;
    }

    const rotateX = opts.rotateX !== undefined ? opts.rotateX : -30;
    const rotateY = opts.rotateY !== undefined ? opts.rotateY : 45;
    const scale = opts.scale !== undefined ? opts.scale : 3.55;

    const s = opts.size !== undefined ? opts.size : 16;

    this.container = document.createElement('div');

    //cw = Math.ceil(s * (1 - Math.sin(rotateX * Math.PI/180))) * scale
    //ch = Math.ceil(s * (1 + Math.cos(rotateY * Math.PI/180))) * scale
  
    const cw = 90;
    const ch = 90;

    const cubeW = Math.floor(ch / ((1 - Math.sin(rotateX * Math.PI/180))) - 2);
    const cubeH = Math.ceil(cw / ((1 + Math.cos(rotateY * Math.PI/180))) + 1);

    const shiftX = cw - s * scale   - 5;
    const shiftY = ch - s * scale   + 5;

    //console.log(cw,s,cubeW,shiftX)
    //console.log(ch,s,cubeH,shiftY)

    this.container.setAttribute('style', `
-webkit-transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${shiftX}px) translateY(${shiftY}px) scale3d(${scale},${scale},${scale});
        transform: rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${shiftX}px) translateY(${shiftY}px) scale3d(${scale},${scale},${scale});
-webkit-transform-origin: 0 0;
        transform-origin: 0 0;
position: relative;
-webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
`);

    const dz = s / 2
    const faceTransforms = { // http://desandro.github.io/3dtransforms/docs/cube.html
      front:  `rotateY(   0deg ) translateZ( ${dz}px )`,
      back:   `rotateX( 180deg ) translateZ( ${dz}px )`,
      right:  `rotateY(  90deg ) translateZ( ${dz}px )`,
      left:   `rotateY( -90deg ) translateZ( ${dz}px )`,
      top:    `rotateX(  90deg ) translateZ( ${dz}px )`,
      bottom: `rotateX( -90deg ) translateZ( ${dz}px )`,
    };

    const faceFilters = opts.faceFilters !== undefined ? opts.faceFilters : {
      front: 'brightness(60%)',
      left: 'brightness(100%)',
      top: 'brightness(150%)',
    };

    for (let i = 0; i < showFaces.length; ++i) {
      const faceName = showFaces[i];

      const face = document.createElement('div');
      face.setAttribute('style', `
-webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
-webkit-transform: ${faceTransforms[faceName]};
        transform: ${faceTransforms[faceName]};
position: absolute;
border: 0.5px solid black;
width: ${s}px;
height: ${s}px;`);
      face.style.backgroundImage = 'url(' + opts[faceName] + ')';
      if (faceFilters[faceName]) {
        face.style.webkitFilter = faceFilters[faceName];
        face.style.      filter = faceFilters[faceName];  // for future support (note: unsupported in Firefox 27; see https://developer.mozilla.org/en-US/docs/Web/CSS/filter#Gecko_notes)
      }

      this.container.style.webkitTransition = '-webkit-transform 1s';
      this.container.style.      transition = '        transform 1s';
      this.container.appendChild(face);
    }
  }
}
