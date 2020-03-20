class Maze {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
    }

    get default_options() {
        return {
            line_limit: 0.5,
            size: 50,
            line_width: 20
        }
    }

    draw(ctx, canvas) {
        this.ctx = ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.options.x_sections = canvas.width / this.options.size;
        this.options.y_sections = canvas.height / this.options.size;

        for (var x = 0; x < this.options.x_sections; x++) {
            for (var y = 0; y < this.options.y_sections; y++) {
                this.line(x * this.options.size, y * this.options.size, Math.random());
            }
        }
    }

    line(x, y, n) {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.options.line_width;
        this.ctx.lineCap = 'round';
        if (n >= this.options.line_limit) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + this.options.size, y + this.options.size);
        }
        else {
            this.ctx.moveTo(x + this.options.size, y);
            this.ctx.lineTo(x, y + this.options.size);
        }
        this.ctx.stroke();
    }

    set position({ x, y }) {
        this.options.x = x;
        this.options.y = y;
    }

    get() {
        return this;
    }
}

export default Maze;