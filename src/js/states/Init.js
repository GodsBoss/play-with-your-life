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
    game.nextState(this.nextState)
  }
}
