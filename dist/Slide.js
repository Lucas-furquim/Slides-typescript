import Timeout from './Timeout.js';
export default class Slide {
    container;
    slides;
    controls;
    time;
    index;
    timeout;
    pausedTimeout;
    paused;
    slide;
    constructor(container, slides, controls, time = 5000) {
        this.timeout = null;
        this.pausedTimeout = null;
        this.container = container;
        this.slides = slides;
        this.controls = controls;
        this.time = time;
        this.paused = false;
        this.index = localStorage.getItem('activeSlide')
            ? Number(localStorage.getItem('activeSlide'))
            : 0;
        this.slide = this.slides[this.index];
        this.init();
    }
    hide(el) {
        el.classList.remove('active');
        if (el instanceof HTMLVideoElement) {
            el.currentTime = 0;
            el.pause();
        }
    }
    show(index) {
        this.index = index;
        this.slide = this.slides[this.index];
        localStorage.setItem('activeSlide', String(this.index));
        this.slides.forEach((el) => this.hide(el));
        this.slide.classList.add('active');
        if (this.slide instanceof HTMLVideoElement) {
            this.autoVideo(this.slide);
        }
        else {
            this.auto(this.time);
        }
    }
    autoVideo(video) {
        video.muted = true;
        video.play();
        let firtsPlay = true;
        video.addEventListener('playing', () => {
            if (firtsPlay)
                this.auto(video.duration * 1000);
            firtsPlay = false;
        });
    }
    auto(time) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        if (this.paused)
            return;
        const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
        this.show(prev);
    }
    next() {
        if (this.paused)
            return;
        const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
        this.show(next);
    }
    pause() {
        console.log('pauso');
        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
            if (this.slide instanceof HTMLVideoElement) {
                this.slide.pause();
            }
        }, 300);
    }
    continue() {
        console.log('continua');
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
            if (this.slide instanceof HTMLVideoElement) {
                this.slide.play();
            }
        }
    }
    addConstrols() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        prevButton.innerText = 'Slide Anterior';
        nextButton.innerText = 'Próximo Slide ';
        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);
        nextButton.addEventListener('pointerup', () => this.next());
        prevButton.addEventListener('pointerup', () => this.prev());
        this.controls.addEventListener('pointerdown', () => this.pause());
        this.controls.addEventListener('pointerup', () => this.continue());
    }
    init() {
        this.addConstrols();
        this.show(this.index);
    }
}
//# sourceMappingURL=Slide.js.map