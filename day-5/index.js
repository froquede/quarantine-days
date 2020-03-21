import Canvas from '../common/canvas.js';
import Recorder from '../common/recorder.js';
import Person from './person.js';
import Control from './control.js';
const fps = 60;

let canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
canvas.set('fps', fps);
canvas.set('clearAfterDraw', true);
canvas.set('motion_blur', 180);
let persons = [new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person(), new Person()];
for (let p of persons) canvas.draw(p);
canvas.draw(new Control(persons));
let recorder = new Recorder();
recorder.set('time_stop', 6e3);
recorder.set('fps', fps);
canvas.draw(recorder);
// recorder.start();