import Highscores from '../Highscores'
import State from '../State'

export default class Init extends State {
  constructor({ nextState, maxHighscoreListLength }) {
    super()
    this.nextState = nextState
    this.maxHighscoreListLength = maxHighscoreListLength
  }

  init(game) {
    game.data.highscores = new Highscores({ maxListLength: this.maxHighscoreListLength })
    try {
      const raw = JSON.parse(window.localStorage.getItem('play_with_your_life.highscores'))
      if (raw !== null) {
        raw.wealth.forEach(
          (value) => game.data.highscores.addWealth(value)
        )
        raw.accomplishment.forEach(
          (value) => game.data.highscores.addAccomplishment(value)
        )
        raw.pleasure.forEach(
          (value) => game.data.highscores.addPleasure(value)
        )
        raw.total.forEach(
          (value) => game.data.highscores.addTotal(value)
        )
      }
    } catch (e) {
      // No local storage or nothing stored.
    }
    game.nextState(this.nextState)
  }
}
