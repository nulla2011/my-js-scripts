const sharp = require('sharp');
const path = require('path');

sharp(process.argv[2].replace('.png', '') + '_A8.png')
  .ensureAlpha()
  .toBuffer()
  .then(mask => {
    sharp(process.argv[2])
      .composite([
        { input: mask, blend: 'dest-in' }
      ])
      .ensureAlpha()
      .toFile(path.basename(process.argv[2]));
  })

