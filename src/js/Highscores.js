export default class Highscores {
  constructor({ maxListLength }) {
    this.lists = {
      wealth: new List({ maxLength: maxListLength }),
      accomplishment: new List({ maxLength: maxListLength }),
      pleasure: new List({ maxLength: maxListLength }),
      total: new List({ maxLength: maxListLength })
    }
  }

  add(score) {
    this.lists.wealth.add(score.wealth)
    this.lists.accomplishment.add(score.accomplishment)
    this.lists.pleasure.add(score.pleasure)
    this.lists.total.add(score.total())
  }
}

class List {
  constructor({ maxLength }) {
    this.maxLength = maxLength
    this.values = []
  }

  add(value) {
    this.values.push(value)
    this.values.sort((a, b) => a - b)
    this.values = this.values.reverse()
    if (this.values.length > this.maxLength) {
      this.values = this.values.slice(0, -1)
    }
  }
}
