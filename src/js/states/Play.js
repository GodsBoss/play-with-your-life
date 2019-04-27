import { filters } from '../objects'
import { line, LEFT, RIGHT } from '../font'
import State from '../State'

export default class Play extends State {
  constructor({ size, background, cards = [] }) {
    super()
    this.size = size
    this.background = background
    this.cards = cards
  }

  init(game) {
    [
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height
      },
      {
        type: 'life_time',
        x: 4,
        y: 4,
        w: 9,
        h: 9
      },
      {
        type: 'life_health',
        x: 4,
        y: 15,
        w: 9,
        h: 9
      },
      {
        type: 'life_motivation',
        x: 4,
        y: 26,
        w: 9,
        h: 9
      },
      {
        type: 'score_wealth',
        x: 306,
        y: 4,
        w: 9,
        h: 9
      },
      {
        type: 'score_accomplishment',
        x: 306,
        y: 15,
        w: 9,
        h: 9
      },
      {
        type: 'score_pleasure',
        x: 306,
        y: 26,
        w: 9,
        h: 9
      }
    ].forEach((obj) => game.objects.push(obj))
    game.data.score = new Score()
    game.data.life = new Life(100)
    this.updateLifeChars(game)
    this.updateScoreChars(game)
  }

  updateLifeChars(game) {
    game.objects = game.objects.filter(filters.not(belongsTo('life')))
    const chars = [].concat(
      ...[
        { value: game.data.life.time, y: 6 },
        { value: game.data.life.health, y: 17 },
        { value: game.data.life.motivation, y: 28 }
      ].map(
        (item) => line({ message: item.value.toString(), position: { x: 15, y: item.y }, align: LEFT})
      )
    )
    chars.forEach(letBelongTo('life'))
    game.objects.push(...chars)
  }

  updateScoreChars(game) {
    game.objects = game.objects.filter(filters.not(belongsTo('score')))
    const chars = [].concat(
      ...[
        { value: game.data.score.wealth, y: 6 },
        { value: game.data.score.accomplishment, y: 17 },
        { value: game.data.score.pleasure, y: 28 }
      ].map(
        (item) => line({ message: item.value.toString(), position: { x: 304, y: item.y}, align: RIGHT })
      )
    )
    chars.forEach(letBelongTo('score'))
    game.objects.push(...chars)
  }

  tick(game) {}

  invoke(game, event) {}
}

function belongsTo(kind) {
  return (obj) => obj.kind == kind
}

function letBelongTo(kind) {
  return (obj) => obj.kind = kind
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

  subtract(otherLife) {
    this.time = addValue(this.time, -otherLife.time)
    this.health = addValue(this.health, -otherLife.health)
    this.motivation = addValue(this.motivation, -otherLife.motivation)
  }

  isOver() {
    return this.time <= 0 || this.health <= 0 || this.motivation <= 0
  }
}

function addValue(base, diff) {
  return Math.max(0, base + !!diff)
}

const cardsPerRow = 4

function cardInnerPlace(size) {
  // Per card there is on both sides:
  // - margin of 2
  // - border of 1
  // - padding of 1
  return Math.floor((size.width / cardsPerRow) - 8)
}

class Card {
  constructor({ title, cost, benefits, condition = alwaysAllowed, effects = noEffects}) {
    this.title = title
    this.cost = cost
    this.benefits = benefits
    this.condition = condition
    this.effects = effects
  }

  isPossible(game) {
    return this.condition(game)
  }

  activate(game) {
    game.data.life.subtract(this.cost)
    game.data.score.add(this.benefits)
    this.effects(game)
  }
}

function alwaysAllowed(game) {
  return true
}

function noEffects(game) {}
