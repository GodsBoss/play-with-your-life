import { fit } from '../font'
import State from '../State'

export default class Help extends State {
  constructor({ nextState, background, size }) {
    super()
    this.nextState = nextState
    this.background = background
    this.size = size
  }

  init(game) {
    game.objects.push(
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: -10000
      }
    )
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
