const sharp = require('sharp');
const path = require('path');

let { x: left, y: top, w: width, h: height } = JSON.parse(process.argv[3]);
sharp(process.argv[2]).extract({ left, top, width, height }).toFile(process.argv[4]);
