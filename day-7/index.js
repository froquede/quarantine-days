import Canvas from '../common/canvas.js';
import Triangles from './triangles.js';
const canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
const fps = 20;
canvas.set('fps', fps);
canvas.set('clearAfterDraw', true);
canvas.set('motion_blur', 50);

canvas.draw(new Triangles());

// let recorder = new Recorder();
// recorder.set('time_stop', 6e3);
// recorder.set('fps', fps);
// canvas.draw(recorder);
// recorder.start();