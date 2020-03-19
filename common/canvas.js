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
        this.options = { fps: 6 };
        this.animate();

        return this;
    }

    set(key, value) {
        // not safe
        this.options[key] = value;
        if(key === 'fps') {
            window.clearInterval(this.interval);
            this.animate();
        }
    }

    draw(object, x, y) {
        object.position = { x, y };
        this.queue.push(object);
    }

    drawOnce(object, x, y) {
        object.position = { x, y };
        object.draw(this.ctx, this.canvas);
    }

    next() {
        for (let q of this.queue) q.draw(this.ctx, this.canvas);
    }

    animate() {
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