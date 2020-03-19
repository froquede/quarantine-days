import Canvas from '../common/canvas.js';
import Recorder from '../common/recorder.js';
import Maze from './maze.js';

let canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
canvas.set('fps', 3);
canvas.draw(new Maze());
let recorder = new Recorder();
recorder.set('fps', 3);
canvas.draw(recorder);