import Random from "./random.js";
import Canvas from '../common/canvas.js';
const canvas = new Canvas('#stage', window.innerWidth, window.innerHeight);
const fps = 16;
canvas.set('fps', fps)
canvas.set('clearAfterDraw', true);
// canvas.set('background', { r: 10, g: 10, b: 10 });
canvas.set('motion_blur', 3);

const r = new Random();
let count = 0;

let y_parts = 50;
let x_parts = 50;
let mean = ((y_parts + x_parts) / 2) / 10;
let max = 150
window.addEventListener("mousemove", (event) => {
    let p_x = event.screenX / window.innerWidth;
    let p_y = event.screenY / window.innerHeight;
    x_parts = 1 + (max * p_x);
    y_parts = 1 + (max * p_y);
    x_base = (window.innerWidth / x_parts);
    y_base = (window.innerHeight / y_parts);
})

let x_base = (window.innerWidth / x_parts);
let y_base = (window.innerHeight / y_parts);

let lines = {
    draw: (ctx, canvas) => {
        for (let y = 0; y < y_parts + 1; y++) {
            let actual_y = y_base * y;
            for (let i = 0; i < x_parts; i++) {
                let actual_x = x_base * i;
                ctx.beginPath();
                ctx.moveTo(actual_x, actual_y);
                ctx.lineWidth = Math.sin(r.randomGaussian(i, count)) * mean;
                ctx.lineTo(actual_x + x_base, actual_y);
                ctx.stroke();
                count += r.random();
            }
        }
    }
}

canvas.draw(lines);