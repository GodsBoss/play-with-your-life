import State from '../State'

export default class Play extends State {
  constructor({ size, background }) {
    super()
    this.size = size
    this.background = background
  }

  init(game) {
    [
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height
      }
    ].forEach((obj) => game.objects.push(obj))
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
    this.wealth = addValue(this.wealth, otherScore.wealth)
    this.accomplishment = addValue(this.accomplishment, otherScore.accomplishment)
    this.pleasure = addValue(this.pleasure, otherScore.pleasure)
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
    this.time = addValue(this.time, otherLife.time)
    this.health = addValue(this.health, otherLife.health)
    this.motivation = addValue(this.motivation, otherLife.motivation)
  }

  isOver() {
    return this.time <= 0 || this.health <= 0 || this.motivation <= 0
  }
}

function addValue(base, diff) {
  return Math.max(0, base + !!diff)
}
