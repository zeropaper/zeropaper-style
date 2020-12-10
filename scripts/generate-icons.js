// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const path = require('path');

const appIcons = require('../src/assets/app-icons');

async function generateIcon(icon, srcIcon) {
  const imgPath = path.join('public', icon.src);

  // console.log(`generating icon: `, icon.src)
  // if (fs.existsSync(imgPath)) {
  //   console.log(`icon already Exists, not regenerating`)
  //   return true
  // }
  const size = parseInt(icon.sizes.substring(0, icon.sizes.lastIndexOf('x')), 10);

  // For vector graphics, instruct sharp to use a pixel density
  // suitable for the resolution we're rasterizing to.
  // For pixel graphics sources this has no effect.
  // Sharp accept density from 1 to 2400
  const density = Math.min(2400, Math.max(1, size));

  console.info('create icon', imgPath, size, density);

  sharp(srcIcon, { density })
    .resize({
      width: size,
      height: size,
      fit: 'contain',
      background: {
        r: 255, g: 255, b: 255, alpha: 0,
      },
    })
    .toFile(imgPath);
}

(async () => {
  const srcIcon = path.resolve(__dirname, '../src/assets/zeropaper.svg');
  await Promise.all(appIcons.map((icon) => generateIcon(icon, srcIcon)));
})();
