import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

async function generate() {
  console.log('Generating favicon icons...');

  // 16x16
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile('public/favicon_io/favicon-16x16.png');

  // 32x32
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon_io/favicon-32x32.png');

  // 32x32 ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .toFile('public/favicon.ico');

  // 180x180 apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/favicon_io/apple-touch-icon.png');

  // 192x192 android chrome
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('public/favicon_io/android-chrome-192x192.png');

  // 512x512 android chrome
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/favicon_io/android-chrome-512x512.png');

  // nk-logo.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/nk-logo.png');

  console.log('Favicon icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
