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
      pleasure: 7
    },
    condition: isFalse('married')
  },
  {
    id: 'party_not_so_hard',
    title: 'Party less hard!',
    cost: {
      time: 1,
      health: 4
    },
    benefits: {
      pleasure: 5
    }
  },
  {
    id: "do_drugs",
    title: "do drugs!",
    cost: {
      time: 1,
      health: 6
    },
    benefits: {
      pleasure: 7
    }
  },
  {
    id: "thoughts_and_prayers",
    title: "Thoughts and prayers!",
    cost: {
      time: 1
    },
    benefits: {
      accomplishment: -1
    }
  },
  {
    id: "marry",
    title: "marry!",
    cost: {
      motivation: 4,
      time: 2
    },
    benefits: {
      accomplishment: 8
    },
    condition: isFalse('married'),
    effects: setSwitch('married', toFixedValue(true))
  },
  {
    id: "divorce",
    title: "Get a divorce!",
    cost: {
      health: 4,
      motivation: -4
    },
    benefits: {
      pleasure: 4,
      wealth: -6
    },
    condition: isTrue('married'),
    effects: setSwitch('married', toFixedValue(false))
  },
  {
    id: "have_a_baby",
    title: "Make a baby!",
    cost: {
      time: 3,
      motivation: 2
    },
    benefits: {
      accomplishment: 8,
      wealth: -3
    },
    effects: setAmount('children_count', add(1))
  },
  {
    id: "adopt_a_child",
    title: "adopt a child!",
    cost: {
      time: 2,
      motivation: 2
    },
    benefits: {
      accomplishment: 8,
      wealth: -2
    },
    condition: isTrue('married'),
    effects: setAmount('children_count', add(1))
  },
  {
    id: "release_child_for_adoption",
    title: "release child for adoption!",
    cost: {
      time: -2,
      motivation: -2
    },
    benefits: {
      accomplishment: -6,
      wealth: 2
    },
    condition: amount('children_count', isMoreThan(0)),
    effects: setAmount('children_count', add(-1))
  },
  {
    id: 'do_sports_you_like',
    title: 'Do sports you like!',
    cost: {
      time: 1,
      health: -1,
      motivation: 1
    },
    benefits: {
      pleasure: 1
    },
    effects: setAmount('fitness', add(1))
  },
  {
    id: 'do_sports_you_dont_like',
    title: "Do sports you don't like!",
    cost: {
      time: 1,
      health: -1,
      motivation: 2
    },
    benefits: {
      accomplishment: 2
    },
    effects: setAmount('fitness', add(1))
  },
  {
    id: 'win_the_olympics',
    title: 'Win the Olympics!',
    cost: {
      time: 3,
      health: 2,
      motivation: 4
    },
    benefits: {
      accomplishment: 8,
      wealth: 7
    },
    condition: filters.every(isFalse('olympics'), amount('fitness', isAtLeast(3))),
    effects: several(setSwitch('olympics', toTrue), setSwitch('famous', toTrue))
  },
  {
    id: 'do_boring_office_work',
    title: 'Work in office (boring)!',
    cost: {
      time: 2,
      motivation: 4
    },
    benefits: {
      wealth: 6
    }
  },
  {
    id: 'do_blue_collar_work',
    title: 'Do blue-collar work!',
    cost: {
      time: 1,
      health: 2
    },
    benefits: {
      wealth: 3
    }
  },
  {
    id: 'do_white_collar_work',
    title: 'Work smarter, not harder!',
    cost: {
      time: 2,
      health: 2,
      motivation: 3
    },
    benefits: {
      wealth: 9
    },
    condition: isTrue('educated')
  },
  {
    id: 'do_dangerous_work',
    title: 'Work harder, not smarter!',
    cost: {
      time: 2,
      health: 6
    },
    benefits: {
      wealth: 8
    }
  },
  {
    id: 'educate_yourself',
    title: 'Educate yourself!',
    cost: {
      time: 4,
      motivation: 2
    },
    benefits: {
      accomplishment: 4
    },
    condition: isFalse('educated'),
    effects: setSwitch('educated', toTrue)
  },
  {
    id: 'get_degree',
    title: 'Get a degree!',
    cost: {
      time: 4,
      motivation: 4
    },
    benefits: {
      accomplishment: 5
    },
    condition: isTrue('educated'),
    effects: setAmount('degree', add(1))
  },
  {
    id: 'win_nobel_prize',
    title: 'Win Nobel prize!',
    cost: {
      time: 5,
      health: 1,
      motivation: 2
    },
    benefits: {
      accomplishment: 10,
      wealth: 5
    },
    condition: filters.every(amount('degree', isAtLeast(1)), isFalse('nobel_prize')),
    effects: several(setSwitch('nobel_prize', toTrue), setSwitch('famous', toTrue))
  },
  {
    id: 'publish_biography',
    title: 'Publish biography!',
    cost: {
      time: 2,
      motivation: 6
    },
    benefits: {
      accomplishment: 5,
      wealth: 12
    },
    condition: filters.every(isTrue('educated'), isTrue('famous'), isFalse('biography')),
    effects: setSwitch('biography', toTrue)
  },
  {
    id: 'use_social_media',
    title: 'Use social media!',
    cost: {
      time: 2,
      motivation: 2
    },
    benefits: {
      pleasure: 2
    },
    effects: setAmount('social_media', add(1))
  },
  {
    id: 'be_angry_troll',
    title: 'Troll the internet!',
    cost: {
      time: 1,
      health: 1
    },
    benefits: {
      pleasure: 2,
      accomplishment: -1
    }
  },
  {
    id: 'start_blog',
    title: 'Start blog!',
    cost: {
      time: 2,
      motivation: 4
    },
    benefits: {
      accomplishment: 2
    },
    condition: isTrue('blog'),
    effects: several(setAmount('social_media', add(2)), setSwitch('blog', toTrue))
  },
  {
    id: 'get_own_social_media_channel',
    title: 'Get own social media channel',
    cost: {
      time: 2,
      motivation: 4
    },
    benefits: {
      accomplishment: 2,
      wealth: 2
    },
    condition: filters.every(amount('social_media', isAtLeast(3)), isFalse('social_media_channel')),
    effects: several(setSwitch('social_media_channel', toTrue), setSwitch('famous', toTrue))
  },
  {
    id: 'stream_and_chill',
    title: 'Stream and chill!',
    cost: {
      time: 1,
      motivation: 3
    },
    benefits: {
      pleasure:4
    }
  },
  {
    id: 'fitness_model',
    title: 'Become a fitness model!',
    cost: {
      time: 2,
      motivation: 2
    },
    benefits: {
      wealth: 3,
      accomplishment: 2
    },
    condition: filters.every(
      amount('social_media', isAtLeast(2)),
      amount('fitness', isAtLeast(2)),
      isFalse('fitness_model')
    ),
    effects: setSwitch('fitness_model', toTrue)
  },
  {
    id: 'make_healthy_food',
    title: 'Make healthy food yourself',
    cost: {
      time: 2,
      motivation: 2,
      health: -1
    },
    benefits: {
      wealth: 1,
      accomplishment: 2
    }
  },
  {
    id: 'just_eat_junkfood',
    title: 'Just eat junkfood',
    cost: {
      time: 1,
      health: 2
    },
    benefits: {
      pleasure: 3
    }
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

function several(...effects) {
  return (game) => effects.forEach((effect) => effect(game))
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
