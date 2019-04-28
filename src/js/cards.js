import { filters } from './objects'

const normalCards = [
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
    condition: amount('children_count', isMoreThan(0)),
    effects: setAmount('children_count', add(-1))
  },
  {
    id: 'do_sports_you_like',
    title: 'Do sports you like!',
    cost: {
      time: 5,
      health: -5
    },
    benefits: {
      pleasure: 5
    },
    effects: setAmount('fitness', add(1))
  },
  {
    id: 'do_sports_you_dont_like',
    title: "Do sports you don't like!",
    cost: {
      time: 5,
      health: -10,
      motivation: 5
    },
    benefits: {
      accomplishment: 5
    },
    effects: setAmount('fitness', add(1))
  },
  {
    id: 'win_the_olympics',
    title: 'Win the Olympics!',
    cost: {
      time: 5,
      health: 5,
      motivation: 10
    },
    benefits: {
      accomplishment: 15,
      wealth: 5
    },
    condition: filters.every(isFalse('olympics'), amount('fitness', isAtLeast(3))),
    effects: setSwitch('olympics', toTrue)
  },
  {
    id: 'do_boring_office_work',
    title: 'Do boring office work!',
    cost: {
      time: 4,
      motivation: 6
    },
    benefits: {
      wealth: 10
    }
  },
  {
    id: 'do_blue_collar_work',
    title: 'Do blue-collar work!',
    cost: {
      time: 2,
      health: 4
    },
    benefits: {
      wealth: 6
    }
  },
  {
    id: 'do_white_collar_work',
    title: 'Do white-collar work!',
    cost: {
      time: 2,
      health: 2,
      motivation: 2
    },
    benefits: {
      wealth: 9
    },
    condition: isTrue('educated')
  },
  {
    id: 'educate_yourself',
    title: 'Educate yourself!',
    cost: {
      time: 8,
      motivation: 2
    },
    benefits: {
      accomplishment: 5
    },
    condition: isFalse('educated'),
    effects: setSwitch('educated', toTrue)
  },
  {
    id: 'get_degree',
    title: 'Get a degree!',
    cost: {
      time: 8,
      motivation: 4
    },
    benefits: {
      accomplishment: 10
    },
    condition: isTrue('educated'),
    effects: setAmount('degree', add(1))
  },
  {
    id: 'win_nobel_prize',
    title: 'Win Nobel prize!',
    cost: {
      time: 8
    },
    benefits: {
      accomplishment: 20,
      wealth: 10
    },
    condition: filters.every(amount('degree', isAtLeast(1)), isFalse('nobel_prize')),
    effects: setSwitch('nobel_prize', toTrue)
  }
]

const debugCards = [
  {
    id: 'debug_lose_time',
    title: 'Lose',
    cost: {
      time: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_health',
    title: 'Lose',
    cost: {
      health: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_motivation',
    title: 'Lose',
    cost: {
      motivation: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_time_health',
    title: 'Lose',
    cost: {
      time: 1000,
      health: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_time_motivation',
    title: 'Lose',
    cost: {
      time: 1000,
      motivation: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_health_motivation',
    title: 'Lose',
    cost: {
      health: 1000,
      motivation: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  },
  {
    id: 'debug_lose_time_health_motivation',
    title: 'Lose',
    cost: {
      time: 1000,
      health: 1000,
      motivation: 1000
    },
    benefits: {},
    condition: isTrue('debug')
  }
]

const cards = [].concat(normalCards, debugCards)

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

function toTrue(game, current) {
  return true
}

function toFalse(game, current) {
  return false
}

function add(value) {
  return (game, current) => current + value
}
