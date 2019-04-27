import State from '../State'

export default class Play extends State {
  constructor({ size, background }) {
    super()
    this.size = size
    this.background = background
  }

  init(game) {
    game.objects.push(
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height
      }
    )
  }

  tick(game) {}

  invoke(game, event) {}
}

class Score {
  constructor() {
    this.wealth = 0
    this.accomplishment = 0
    this.wellBeing = 0
  }

  add(otherScore) {
    this.wealth += +otherScore.wealth
    this.accomplishment += +otherScore.accomplishment
    this.wellBeing += +otherScore.wellBeing
  }

  // Calculates the resulting total score.
  total() {
    return this.wealth * this.accomplishment * this.wellBeing
  }
}
