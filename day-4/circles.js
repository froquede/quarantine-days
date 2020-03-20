class Circles {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
        this.time = 0;
    }

    get default_options() {
        return {
            radius: 50,
            circles: 10,
            distance: 10
        }
    }

    draw(ctx, canvas) {
        this.updateCenter();
        this.ctx = ctx;
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.createGroup(.1);
        this.createGroup(.5);
        this.createGroup(1);
        this.options.radius += 1 * Math.sin(this.time);
        this.time += 0.0025;
    }

    updateCenter() {
        this.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
    }

    createGroup(multiplier) {
        for(let i = 0; i < this.options.circles; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.center.x, this.center.y, (this.options.radius * multiplier) + (i * this.options.distance), 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }

    set position({ x, y }) {
        this.options.x = x;
        this.options.y = y;
    }

    get() {
        return this;
    }
}

export default Circles;