export default class Timeout {
  id;
  handler;
  constructor(handler: TimerHandler, time: number) {
    this.handler = handler;
    this.id = setTimeout(handler, time);
  }
  clear() {
    clearTimeout(this.id);
  }
}
