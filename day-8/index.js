import Canvas from '../common/canvas.js';
import Slit from './slit.js';
const _canvas = new Canvas('#stage', 480, 360);
const fps = 20;
_canvas.set('fps', fps);
_canvas.set('clearAfterDraw', true);
_canvas.set('motion_blur', 50);
// _canvas.draw(new Slit());
const canvas = _canvas.canvas;
const master = _canvas.ctx;

import bender from '../common/wobble.mjs'
let filter = bender(0)
const buffer = canvas.cloneNode().getContext('2d')

const camera = document.createElement('video');
const { width: w, height: h } = canvas
const screen = { x: 0, y: 0, w, h }
camera.setAttribute('src', 'video.mp4');
camera.setAttribute('preload', 'auto');
camera.addEventListener('loadeddata', ({ target }) => {
    const { videoWidth: vw, videoHeight: vh } = target

    const dx = vw - w
    const dy = vh - h

    screen.x -= 0.5 * dx
    screen.y -= 0.5 * dy

    screen.w += dx
    screen.h += dy

    Object.assign(camera, { width: vw, height: vh })

    document.querySelector('.js-start').removeAttribute('disabled');
    document.querySelector('svg').remove();
    document.querySelector('.js-start').onclick = () => {
        document.querySelector('body').prepend(camera);
        camera.play().then(() => {
            window.requestAnimationFrame(repeat)
        }).catch(console.log)
    }
});

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
let s = audioCtx.createMediaElementSource(camera);
s.connect(analyser);
s.connect(audioCtx.destination);
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
console.log(bufferLength);

let time = 0;
const repeat = () => {
    analyser.getByteTimeDomainData(dataArray);

    buffer.drawImage(camera, 0, 0)

    const source = buffer.getImageData(0, 0, w, h)
    const result = filter(source, dataArray[0] / 3)

    master.putImageData(result, 0, 0)
    window.requestAnimationFrame(repeat)
}