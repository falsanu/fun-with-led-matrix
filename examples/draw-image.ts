import { LedMatrix } from '../src';
import { matrixOptions, runtimeOptions } from './_config';
import { baseBuffer } from './image-buffer';
// import * as fs from 'fs';
// import * as path from 'path';

(() => {
  try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    // read bin
    // const fileContents = fs.readFileSync(path.join(__dirname, 'image.bin'));

    // console.log(fileContents);
    matrix.clear().brightness(80);
    // const data = Buffer.from(baseBuffer);
    console.log(
      `${baseBuffer.length}  . ${matrix.width() * matrix.height() * 3}`
    );

    const buffer1 = Buffer.from(
      baseBuffer.filter(function (value, index, Arr) {
        return index % 4 != 0;
      })
    );
    // const buffer2 = Buffer.of(
    //   ...baseBuffer.map(() => (Math.random() < 0.1 ? 0xff : 0x00))
    // );

    // let useBuffer1 = true;
    matrix.afterSync(() => {
      // useBuffer1 = !useBuffer1;
      matrix.drawBuffer(buffer1);
      setTimeout(() => matrix.sync(), 1);
    });

    matrix.sync();
  } catch (error) {
    console.error(`${__filename} caught: `, error);
  }
})();
