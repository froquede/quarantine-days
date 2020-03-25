class Slit {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
    }

    get default_options() {
        return { }
    }

    draw(ctx, canvas) {
        this.ctx = ctx;
    }

    set position({ x, y }) {
        this.options.x = x;
        this.options.y = y;
    }

    get() {
        return this;
    }
}

export default Slit;