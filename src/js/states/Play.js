import { filters } from '../objects'
import { fit, line, LEFT, RIGHT } from '../font'
import State from '../State'

export default class Play extends State {
  constructor({ size, background, cards = [] }) {
    super()
    this.size = size
    this.background = background
    this.cards = cards.map((raw) => new Card(raw))
  }

  init(game) {
    [
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: -10000
      },
      {
        type: 'life_time',
        x: 4,
        y: 4,
        w: 9,
        h: 9,
        z: 0
      },
      {
        type: 'life_health',
        x: 4,
        y: 15,
        w: 9,
        h: 9,
        z: 0
      },
      {
        type: 'life_motivation',
        x: 4,
        y: 26,
        w: 9,
        h: 9,
        z: 0
      },
      {
        type: 'score_wealth',
        x: 306,
        y: 4,
        w: 9,
        h: 9,
        z: 0
      },
      {
        type: 'score_accomplishment',
        x: 306,
        y: 15,
        w: 9,
        h: 9,
        z: 0
      },
      {
        type: 'score_pleasure',
        x: 306,
        y: 26,
        w: 9,
        h: 9,
        z: 0
      }
    ].forEach((obj) => game.objects.push(obj))
    game.data.score = new Score()
    game.data.life = new Life(100)
    this.updateLifeChars(game)
    this.updateScoreChars(game)
    this.updateCards(game)
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
    chars.forEach(setZ(0))
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
    chars.forEach(setZ(0))
    game.objects.push(...chars)
  }

  updateCards(game) {
    game.objects = game.objects.filter(filters.not(belongsTo('card')))
    const possibleCards = []
    this.cards.forEach(
      (card) => {
        if (card.isPossible(game)) {
          possibleCards.push(card)
        }
      }
    )
    shuffle(possibleCards)
    possibleCards.
      slice(0, 8).
      forEach(
        (card, index) => {
          const col = index % 4
          const row = Math.floor(index / 4)
          game.objects.push(
            {
              type: "card_background",
              belongs_to: 'card',
              card_id: card.id,
              x: col * 80 + 2,
              y: row * 64 + 74,
              w: 76,
              h: 60,
              z: 1000
            }
          )
          game.objects.push(
            ...withAll(fit({ message: card.title, position: { x: col * 80 + 4, y: row * 64 + 76 }, width: 76 }), setZ(10000))
          )
          createCardChangeObjects(game, { position: { x: col * 80 + 4, y: row * 64 + 103 }, typePrefix: 'life', changes: card.getCost(), swapSignum: SWAP_SIGNUM })
          createCardChangeObjects(game, { position: { x: col * 80 + 48, y: row * 64 + 103 }, typePrefix: 'score', changes: card.getBenefits() })
        }
    )
  }

  tick(game) {}

  invoke(game, event) {}
}

const KEEP_SIGNUM = 1
const SWAP_SIGNUM = -1

function createCardChangeObjects(game, { position, typePrefix, changes, swapSignum = KEEP_SIGNUM }) {
  changes.forEach(
    (change, index) => {
      game.objects.push(
        {
          type: typePrefix + "_" + change.type,
          belongs_to: 'card',
          x: position.x,
          y: position.y + index * 10,
          w: 9,
          h: 9,
          z: 10000
        }
      )
      const value = (change.value * swapSignum < 0 ? '-' : '+') + change.value
      game.objects.push(
        ...withAll(line({ message: value, position: { x: position.x + 11, y: position.y + 2 + index * 10 }}), setZ(10000))
      )
    }
  )
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
  constructor({ id, title, cost, benefits, condition = alwaysAllowed, effects = noEffects}) {
    this.id = id
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

  // getCost returns costs as a sorted list.
  getCost() {
    return getTypedValues(this.cost, ['time', 'health', 'motivation'])
  }

  // getBenefits returns benefits as a sorted list.
  getBenefits() {
    return getTypedValues(this.benefits, ['wealth', 'accomplishment', 'pleasure'])
  }
}

function getTypedValues(container, keys) {
  const result = []
  keys.
    filter((key) => typeof container[key] === 'number').
    forEach((key) => result.push({type: key, value: container[key] })
  )
  return result
}

function alwaysAllowed(game) {
  return true
}

function noEffects(game) {}

function shuffle(arr) {
  for(var i=0; i<arr.length; i++) {
    var j = Math.floor(Math.random() * arr.length)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

// withAll executes fn on all items of arr, then returns it.
function withAll(arr, fn) {
  arr.forEach(
    (item, index, currentArr) => fn(item, index, currentArr)
  )
  return arr
}

// setZ returns a function which sets z on an object to the value of the variable z.
// Used with withAll. Can also be used with forEach.
function setZ(z) {
  return function(item) {
    item.z = z
  }
}
