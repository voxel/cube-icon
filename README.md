# cube-icon

3D CSS cube icons

Usage:

    var CubeIcon = require('cube-icon')
    document.body.appendChild(CubeIcon(opts));

Example (run `npm start`, or view the **[live demo](http://deathcap.github.io/cube-icon)**):

![screenshot](http://i.imgur.com/CQVnwle.png "Screenshot")

Options:

* `showFaces`: array of face names to show, defaults to `['left', 'top', 'front']`
* `images`: a string, array, or object of images to show on each face, in [cube-side-array](https://github.com/deathcap/cube-side-array) format
* `back`, `right`, `left`, `top`, `bottom`, `front`: alternatively you can specify each side image in a separate option
* `side`: shorthand for `left` and `front`
* `rotateX`: X rotation in degrees, default -30
* `rotateY`: Y rotation in degrees, default 45
* `scale`: scaling factor, default 3.55
* `size`: size in pixels, default 16
* `faceFilters`: CSS transforms for each face, defaults to `{front: 'brightness(60%)', left: 'brightness(100%)', top: 'brightness(150%)'}`

## License

MIT

