class Canvas {
    constructor(id, w, h) {
        this.canvas = id ? document.querySelector(id) : document.getElementsByTagName('canvas')[0]; // replace
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');

        this.queue = [], this.staticQueue = [];

        this.next = this.next.bind(this);
        this.animate = this.animate.bind(this);
        this.ctx.lineWidth = 0;
        this.count = 0;
        this.options = { 
            fps: 6, motion_blur: 1,
            background: {
                r: 250, g: 250, b: 250
            }
        };

        return this;
    }

    set(key, value) {
        // not safe
        this.options[key] = value;
        if (key === 'fps' && this.looping) {
            window.clearInterval(this.interval);
            this.animate();
        }
    }

    draw(object, x, y) {
        object.position = { x, y };
        this.queue.push(object);

        if (!this.looping) {
            this.animate();
        }
    }

    drawOnce(object, x, y) {
        object.position = { x, y };
        object.draw(this.ctx, this.canvas, this.options);
    }

    next() {
        if (this.options.clearAfterDraw) {
            console.log(this.options.background)
            this.ctx.fillStyle = `rgba(${this.options.background.r}, ${this.options.background.g}, ${this.options.background.b}, ${1 / this.options.motion_blur})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.count = 0;
        }
        for (let q of this.queue) q.draw(this.ctx, this.canvas, this.options);
    }

    animate() {
        console.trace();
        this.looping = true;
        // let last = +(new Date())
        this.interval = setInterval(() => {
            // let actual = +(new Date());
            // console.log(actual - last)
            // last = actual;
            // window.requestAnimationFrame(this.animate);
            this.next();
            this.count += 1000 / 6;
        }, 1000 / this.options.fps);
    }
}

export default Canvas;