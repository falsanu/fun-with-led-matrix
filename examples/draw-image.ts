import { LedMatrix } from '../src';
import { matrixOptions, runtimeOptions } from './_config';
import { baseBuffer } from './image-buffer';
// import * as fs from 'fs';
// import * as path from 'path';

// todo: check this
//https://redstapler.co/realtime-video-processing-javascript-tutorial/
(() => {
  try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    matrix.clear().brightness(80);
    console.log(
      `${baseBuffer.length}  . ${matrix.width() * matrix.height() * 3}`
    );

    const buffer1 = Buffer.from(
      baseBuffer.filter(function (value, index, Arr) {
        return index % 4 != 0;
      })
    );

    matrix.afterSync(() => {
      matrix.drawBuffer(buffer1);
      setTimeout(() => matrix.sync(), 1);
    });

    matrix.sync();
  } catch (error) {
    console.error(`${__filename} caught: `, error);
  }
})();
