import { filters } from './objects'

const cards = [
  {
    id: "party_hard",
    title: "party hard!",
    cost: {
      time: 1,
      health: 5
    },
    benefits: {
      pleasure: 10
    }
  },
  {
    id: "do_drugs",
    title: "do drugs!",
    cost: {
      time: 1,
      health: 8
    },
    benefits: {
      pleasure: 15
    }
  },
  {
    id: "waste_time",
    title: "waste time!",
    cost: {
      time: 3
    },
    benefits: {}
  },
  {
    id: "marry",
    title: "marry!",
    cost: {
      motivation: 5,
      time: 3
    },
    benefits: {
      accomplishment: 5
    },
    condition: isFalse('married'),
    effects: setSwitch('married', toFixedValue(true))
  },
  {
    id: "divorce",
    title: "divorce!",
    cost: {
      health: 5,
      motivation: -5
    },
    benefits: {
      wealth: -10
    },
    condition: isTrue('married'),
    effects: setSwitch('married', toFixedValue(false))
  },
  {
    id: "have_a_baby",
    title: "have a baby!",
    cost: {
      time: 10,
      motivation: 3
    },
    benefits: {
      accomplishment: 10,
      wealth: -7
    },
    effects: setAmount('children_count', add(1))
  },
  {
    id: "adopt_a_child",
    title: "adopt a child!",
    cost: {
      time: 8,
      motivation: 1
    },
    benefits: {
      accomplishment: 7,
      wealth: -5
    },
    effects: setAmount('children_count', add(1))
  },
  {
    id: "release_child_for_adoption",
    title: "release child for adoption!",
    cost: {
      time: -5,
      motivation: -2
    },
    benefits: {
      accomplishment: -3,
      wealth: 5
    },
    condition: amount('children_count', isMoreThan(0))
  }
]

export default cards

function isTrue(switchKey) {
  return (game) => game.data.properties.getSwitch(switchKey)
}

function isFalse(switchKey) {
  return (game) => !game.data.properties.getSwitch(switchKey)
}

function amount(key, pred) {
  return (game) => pred(game.data.properties.getAmount(key))
}

function isMoreThan(min) {
  return (current) => current > min
}

function isAtLeast(min) {
  return (current) => current >= min
}

function isExactly(value) {
  return (current) => current == value
}

function isAtMost(max) {
  return (current) => current <= max
}

function isLessThan(max) {
  return (current) => current < max
}

function isBetween(min, max) {
  return filters.every(isAtLeast(min), isAtMost(max))
}

function setSwitch(key, change) {
  return (game) => game.data.properties.setSwitch(key, change(game, game.data.properties.getSwitch(key)))
}

function setAmount(key, change) {
  return (game) => game.data.properties.setAmount(key, change(game, game.data.properties.getAmount(key)))
}

function toFixedValue(value) {
  return (game, current) => value
}

function add(value) {
  return (game, current) => current + value
}
