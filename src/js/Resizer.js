export default class Resizer {
  constructor(size) {
    this.size = size
    this.onResize = (size) => {}
    this.margin = {
      horizontal: 0,
      vertical: 0
    }
    this.factor = 1
  }

  connect(window) {
    window.addEventListener('resize', (ev) => this.resize(ev.target), false)
    return this
  }

  setMargin(horizontal, vertical) {
    this.margin = {
      horizontal: horizontal,
      vertical: vertical
    }
    return this
  }

  setMinimalFactor(f) {
    this.minimalFactor = f
    return this
  }

  setOnResize(onResize) {
    this.onResize = onResize
  }

  resize(window) {
    const hFactor = Math.max(1, Math.floor((window.innerWidth - this.margin.horizontal) / this.size.width))
    const vFactor = Math.max(1, Math.floor((window.innerHeight - this.margin.vertical) / this.size.height))
    const factor = Math.max(this.minimalFactor, Math.min(hFactor, vFactor))
    if (this.factor != factor) {
      this.factor = factor
      this.onResize(factor)
    }
  }
}
