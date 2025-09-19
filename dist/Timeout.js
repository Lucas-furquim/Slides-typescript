export default class Timeout {
    id;
    handler;
    constructor(handler, time) {
        this.handler = handler;
        this.id = setTimeout(handler, time);
    }
    clear() {
        clearTimeout(this.id);
    }
}
//# sourceMappingURL=Timeout.js.map