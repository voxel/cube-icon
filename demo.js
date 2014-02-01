'use strict';

var CubeIcon = require('./');

var images = {
  dirt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAb0lEQVQ4y2OYmWb8/84U7/8gGhfGJg8TY8AlQchQGGYgRhGyYegGM5BiK7o8iM9Air+xegGbqcQahuICYm1EV8tArI24LGAgN/5R0gEl4cBAbujDA5EYDQQTErGKceYFcqMQwwXEBCZRYUDIIGQ+AHmcSKuZbPIVAAAAAElFTkSuQmCC',
  stone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASklEQVQ4y+1SsQ0AMAjidz/gYTu1MU2QprODE6CggmSqiohTCkMldAKF49fBxlGJt1A1kw66aXIHjuCi4DWvigN3JucC8wfzB2QuoGWkP++xVxEAAAAASUVORK5CYII=',
  grass_top: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYElEQVQ4y61TwREAIAiy/cdyGqao3qWIXQ8flgGimfmYhh1OAuQsvahAPQOoFCACUFkR5K2+wxbQMMyZApXxrJUZ8TIFBoRoCl8UdL2QHpSLpBanf+F1hJcCNP2AugckXwA2yZhbyqZNAAAAAElFTkSuQmCC',
  grass_side: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4y2NgOMz4n+ElEB/Gg1/iEcMpQchQGJ6ZZvyfEL4zxRsrG4QZkAXRJfEZBOMzEKsYF2bAZiqxhqG4gFgb0dUyEGsjLgsYSAk0bAHOgCt0yXYBqWHBQIwGggmJWMXY1DFQEoUYLiAmMIkKA0IGIfMBkw04/LuclggAAAAASUVORK5CYII='
};

var box = document.createElement('div');
box.setAttribute('style', 'border: 1px solid black; position: absolute;');
document.body.appendChild(box);

//console.log({side:images.grass_side, top:images.grass_top});
//console.log({left:images.dirt, front:images.stone, top:images.grass_top});

box.appendChild(CubeIcon({side:images.dirt, top:images.dirt}).container);
//box.appendChild(CubeIcon({side:images.grass_side, top:images.grass_top}).container);
//box.appendChild(CubeIcon({left:images.dirt, front:images.stone, top:images.grass_top}).container);
//box.appendChild(CubeIcon({images:[images.grass_top, null, images.dirt, images.stone]}).container);
