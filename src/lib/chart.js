import template from './chart_template';

const defaultOptions = {
    percent: 0,
    duration: 2000,
    frame: 30,
};

export default class Chart {
    #template = template;
    #elem;
    #percent;
    #duration;
    #frame;
    #label;
    #handle;

    constructor(container, data = {}) {
        const { percent, duration, frame } = { ...defaultOptions, ...data };

        this.#percent = percent;
        this.#duration = duration;
        this.#frame = frame;

        this.#elem = document.querySelector(container);
    }

    set percent(percent) {
        this.#percent = percent;
    }

    set duration(duration) {
        this.#duration = duration;
    }

    set label(label) {
        this.#label = label;
    }

    render = () => {
        this.#elem.innerHTML = this.#template({
            percent: this.#percent * 10,
            duration: `${this.#duration / 1000}s`,
            label: this.#label,
        });

        const maxLoop = Math.floor(this.#duration / (1000 / this.#frame));
        let loopCount = 0;

        this.#handle = setInterval(() => {
            loopCount++;

            this.#elem.querySelector('#progress').innerHTML =
                loopCount > maxLoop
                    ? `${this.#percent}%`
                    : `${Math.floor(this.#percent / maxLoop) * loopCount}%`;

            if (loopCount > maxLoop) {
                clearInterval(this.#handle);
            }
        }, 1000 / this.#frame);
    };
}
