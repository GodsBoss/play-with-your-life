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
    this.addWealth(score.wealth)
    this.addAccomplishment(score.accomplishment)
    this.addPleasure(score.pleasure)
    this.addTotal(score.total())
  }

  addWealth(value) {
    this.lists.wealth.add(value)
  }

  addAccomplishment(value) {
    this.lists.accomplishment.add(value)
  }

  addPleasure(value) {
    this.lists.pleasure.add(value)
  }

  addTotal(value) {
    this.lists.total.add(value)
  }

  raw() {
    return {
      wealth: this.lists.wealth.raw(),
      accomplishment: this.lists.accomplishment.raw(),
      pleasure: this.lists.pleasure.raw(),
      total: this.lists.total.raw()
    }
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

  raw() {
    return this.values
  }
}
