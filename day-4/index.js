import Canvas from '../common/canvas.js';
import Recorder from '../common/recorder.js';
import Circles from './circles.js';
const fps = 60;

let canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
canvas.set('fps', fps);
canvas.draw(new Circles());
let recorder = new Recorder();
recorder.set('time_stop', 6e3);
recorder.set('fps', fps);
canvas.draw(recorder);
// recorder.start();