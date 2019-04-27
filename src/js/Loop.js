class Loop {
  constructor(repeat, action) {
    this.repeat = repeat
    this.action = action
    this.running = false
  }

  start () {
    if (this.running) {
      return false
    }
    this.running = true
    this.step()
    return true
  }

  step () {
    if (!this.running) {
      return false
    }
    this.repeat(
      () => this.step()
    )
    this.action()
    return true
  }

  stop() {
    const stopped = this.running
    this.running = false
    return stopped
  }
}

function start(repeat, action) {
  const loop = new Loop(repeat, action)
  loop.start()
  return loop
}

export { start, Loop }
