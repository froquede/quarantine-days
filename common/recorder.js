class Recorder {
    constructor(options = {}) {
        this.options = Object.assign(this.default_options, options);
        this.init();

        this.start = this.start.bind(this);
        this.draw = this.draw.bind(this);
        this.checkAttributes();
    }

    get default_options() {
        return {
            fps: 24,
            motion_blur: 1,
            time_stop: 5e3,
            format: 'gif'
        }
    }

    set(key, value) {
        // not safe
        this.options[key] = value;
        if (key === 'fps' || key === 'motion_blur') {
            this.init();
        }
    }

    init() {
        this.total = (this.options.time_stop / 1000) * (this.options.fps * (this.options.motion_blur));
        this.capturer = new CCapture({
            format: this.options.format,
            framerate: this.options.fps,
            workersPath: '../node_modules/ccapture.js/src/',
            motionBlurFrames: this.options.motion_blur,
            name: `${window.document.title} ${this.getDateFormated()}`,
        });
    }

    checkAttributes() {
        let buttons = window.document.querySelectorAll('[recorder-start]');
        for (let b = 0; b < buttons.length; b++) {
            buttons[b].onclick = this.start;
        }
    }

    start() {
        this.rendered_count = 0;
        this.capturer.start();
        this.stop = false;

        this.timeout = setTimeout(() => {
            this.stop = true;
            if (this.saved !== true) {
                this.capturer.stop();
                this.capturer.save();
                this.saved = true;
            }
        }, this.options.time_stop);
    }

    draw(ctx, canvas) {
        if (this.stop === false) {
            try {
                this.capturer.capture(canvas);
            } catch (err) { console.log(err) }
            this.rendered_count++;
            console.log('Render process: ' + ((this.rendered_count / this.total) * 100).toFixed(2) + '%');
        }
    }

    getDateFormated() {
        let date = new Date();
        let day = this.padZero(date.getDate());
        let month = this.padZero(date.getMonth());
        let year = date.getFullYear();
        let hours = this.padZero(date.getHours());
        let minutes = this.padZero(date.getMinutes());
        let seconds = this.padZero(date.getSeconds());

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    padZero(t, l) {
        return ('0' + t).slice(-l || -2);
    }
}

export default Recorder;
