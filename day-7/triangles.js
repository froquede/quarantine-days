class Triangles {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
        this.time = 10 * Math.random();
    }

    get default_options() {
        return {
            size: window.innerWidth / 12
        }
    }

    draw(ctx, canvas) {
        this.ctx = ctx;
        // this.ctx.fillStyle = `rgba(20,20,20,0.1)`
        for (let i = 0; i < 10; i++) {
            let size = this.options.size + (1000 - (80 * i))
            let x = (canvas.width / 2) - (size / 2);
            let y = (canvas.height / 2) + (size / 2);
            this.ctx.lineWidth = i / 10;
            this.ctx.fillStyle = `rgba(${i*6},${i},${i * 4},0.1)`
            this.ctx.beginPath();
            this.ctx.moveTo(x, y * Math.cos(this.time*2));
            this.ctx.lineTo(x + (size / 2) * Math.sin(this.time), y - size);
            this.ctx.lineTo(x + size * Math.sin(this.time), y);
            this.ctx.lineTo(x, y * Math.cos(this.time*2));
            this.ctx.fill();
            this.ctx.translate(canvas.width / 2, canvas.height / 2);
            this.ctx.rotate(((9 * Math.PI) * Math.sin(this.time / 10)) / 180);
            this.ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
        }
        this.ctx.translate(canvas.width / 2, canvas.height / 2);
        this.ctx.rotate(-360);
        this.ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
        this.time += 0.06 * Math.random();
    }

    set position({ x, y }) {
        this.options.x = x;
        this.options.y = y;
    }

    get() {
        return this;
    }
}

export default Triangles;