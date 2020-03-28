const flip = {
    length: 14,
    path: ''
}

class Skate {
    constructor(options) {
        this.options = Object.assign(this.default_options, options);
        this.draw = this.draw.bind(this);
        this.trick_count = 1;
        this.keys = {}
        this.loadTricks();
        this.listeners();
    }

    get default_options() {
        return {
            tile_size: 64,
            x: 0,
            y: window.innerHeight / 2,
            speed: 12
        }
    }

    loadTricks() {
        this.tricks = { flip };

        for (let t in this.tricks) {
            this.generateFrameReference(this.tricks[t]);
        }
    }

    generateFrameReference(trick) {
        trick.frames = [];
        for (let l = 1; l < trick.length; l++) {
            let img = new Image();
            img.src = `./sprites/${trick.path}${(`0000${l}`).slice(-4)}.png`;
            trick.frames[l] = img;
        }
        console.log(trick)
    }

    draw(ctx, canvas, options) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.checkInput();
        if (this.actual_trick) {
            this.trick()
        }
        else {
            this.ctx.drawImage(this.tricks['flip'].frames[1], this.options.x, this.options.y);
        }
        // this.options.x += 6;
    }

    checkInput() {
        if (!this.actual_trick) {
            let keys = this.getKeys();
            for (let t in keys) {
                let pressed = keys[t]
                if (pressed === ' ') {
                    this.actual_trick = 'flip';
                    break;
                }
                this.move(pressed);
            }
            this.lastKeys = keys;
        }
    }

    trick(key) {
        try {
            this.ctx.drawImage(this.tricks[this.actual_trick].frames[this.trick_count], this.options.x, this.options.y);
            for(let k of this.lastKeys) {
                this.move(k);
            }
            this.trick_count++;
            if (this.trick_count >= this.tricks[this.actual_trick].length) {
                this.trick_count = 1;
                delete this.actual_trick;
            }
        } catch (err) {
            console.log(err)
        }
    }

    listeners() {
        document.addEventListener('keydown', (e) => { this.onKeyDown(e) }, false);
        document.addEventListener('keyup', (e) => { this.onKeyUp(e) }, false);
    }

    onKeyDown(e) {
        this.keys[e.key] = e.key;
    }

    onKeyUp(e) {
        this.keys[e.key] = false;
    }

    getKeys() {
        let newArr = new Array();
        for (let i in this.keys) {
            if (this.keys[i]) newArr[newArr.length] = this.keys[i]
        }
        return newArr;
    }

    move(key) {
        if (key === 'ArrowUp') this.options.y -= this.options.speed;
        if (key === 'ArrowDown') this.options.y += this.options.speed;
        if (key === 'ArrowRight') this.options.x += this.options.speed;
        if (key === 'ArrowLeft') this.options.x -= this.options.speed;
    }

    set position({ x, y }) {
    }

    get() {
        return this;
    }
}

export default Skate;