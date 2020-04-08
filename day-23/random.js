class Random {
    constructor() {
        this.y2 = 0;
    }

    random(min, max) {
        let rand = Math.random();
        if (typeof min === 'undefined') {
            return rand;
        } else if (typeof max === 'undefined') {
            if (min instanceof Array) {
                return min[Math.floor(rand * min.length)];
            } else {
                return rand * min;
            }
        } else {
            if (min > max) {
                const tmp = min;
                min = max;
                max = tmp;
            }

            return rand * (max - min) + min;
        }
    }

    randomGaussian(mean, sd) {
        let y1, x1, x2, w;
        if (this._gaussian_previous) {
            y1 = this.y2;
            this._gaussian_previous = false;
        } else {
            do {
                x1 = this.random(2) - 1;
                x2 = this.random(2) - 1;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1);
            w = Math.sqrt(-2 * Math.log(w) / w);
            y1 = x1 * w;
            this.y2 = x2 * w;
            this._gaussian_previous = true;
        }

        const m = mean || 0;
        const s = sd || 1;
        return y1 * s + m;
    };
}

export default Random;