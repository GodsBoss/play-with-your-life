export class EventListener {
  constructor() {
    this.scaled = 1
    this.callback = (x, y) => {}
  }

  setScaled(factor) {
    this.scaled = factor
    return this
  }

  setCallback(callback) {
    this.callback = callback
    return this
  }

  asListener() {
    return (e) => this.click(e)
  }

  click(event) {
    this.callback(
      (event.clientX - event.target.offsetLeft) / this.scaled,
      (event.clientY - event.target.offsetTop) / this.scaled
    )
  }
}
