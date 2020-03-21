class Person {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
        this.time = 0;
        this.id = Math.random().toString(36);
        this.center = {
            x: window.innerWidth * Math.random(),
            y: window.innerHeight * Math.random()
        }
    }

    get default_options() {
        return {
            radius: window.innerWidth / 120 + ((window.innerWidth / 100) * Math.random()),
            threshold: 10
        }
    }

    draw(ctx, canvas) {
        // this.updateCenter();
        this.ctx = ctx;
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.options.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.time += 0.05;
        this.walk();
    }

    walk() {
        if (!this.direction) {
            this.direction = { x: 4 - ((1 * Math.random()) * 8), y: 4 - ((1 * Math.random()) * 8) }
        }

        this.center.x += this.direction.x + Math.sin(this.time + Math.random());
        this.center.y += this.direction.y + (Math.cos(this.time + Math.random()) / 2);

        let limit_x = this.center.x + this.options.radius / 2;
        if (limit_x >= window.innerWidth - this.options.threshold || this.center.x - this.options.radius / 2 <= this.options.threshold) {
            let last_x = this.direction.x;
            this.direction.x = 4 - ((1 * Math.random()) * 8)

            if(last_x < 0 && this.direction.x < 0 || last_x > 0 && this.direction.x > 0){
                this.direction.x *= -1
            }
        }

        let limit_y = this.center.y + this.options.radius / 2;
        if (limit_y >= window.innerHeight - this.options.threshold || this.center.y - this.options.radius / 2 <= this.options.threshold) {
            let last_y = this.direction.y;
            this.direction.y = 4 - ((1 * Math.random()) * 8)

            if(last_y < 0 && this.direction.y < 0 || last_y > 0 && this.direction.y > 0){
                this.direction.y *= -1
            }
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

export default Person;