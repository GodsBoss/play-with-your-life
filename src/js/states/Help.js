import { fit } from '../font'
import Visible from './Visible'

export default class Help extends Visible {
  constructor({ nextState, background, size }) {
    super({ background, size })
    this.nextState = nextState
  }

  init(game) {
    super.init(game)
    game.objects.push(
      {
        type: 'screen_help',
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: 0
      }
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState(this.nextState)
    }
  }
}
