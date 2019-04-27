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
    this.pleasure = 0
  }

  add(otherScore) {
    this.wealth += +!!otherScore.wealth
    this.accomplishment += +!!otherScore.accomplishment
    this.pleasure += +!!otherScore.pleasure
  }

  // Calculates the resulting total score.
  total() {
    return this.wealth * this.accomplishment * this.pleasure
  }
}

class Life {
  constructor(initialAmount) {
    this.time = initialAmount
    this.health = initialAmount
    this.motivation = initialAmount
  }

  add(otherLife) {
    this.time = addLifeValue(this.time, otherLife.time)
    this.health = addLifeValue(this.health, otherLife.health)
    this.motivation = addLifeValue(this.motivation, otherLife.motivation)
  }

  isOver() {
    return this.time <= 0 || this.health <= 0 || this.motivation <= 0
  }
}

function addLifeValue(base, diff) {
  return Math.max(0, base + !!diff)
}
