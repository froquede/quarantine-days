import Canvas from '../common/canvas.js';
import Skate from './skate.js';
const canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
const fps = 20;
canvas.set('fps', fps)
canvas.set('clearAfterDraw', true);
canvas.set('background', { r: 10, g: 10, b: 10 });
canvas.set('motion_blur', parseInt(100 * Math.random()));
canvas.draw(new Skate());