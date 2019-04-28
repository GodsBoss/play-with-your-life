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
        z: -1
      }
    )
    game.objects.push(
      ...fit(
        {
          message: 'This is your life. It is threefold: time, health and motivation. If at least one of those drops to zero, your game is over.',
          position: { x: 30, y: 5 },
          width: 125
        }
      )
    )
    game.objects.push(
      ...fit(
        {
          message: 'These are your scores. You gain points in wealth, accomplishments and pleasure. In the end, a total score is calculated as the product of all three.',
          position: { x: 165, y: 5 },
          width: 125
        }
      )
    )
    game.objects.push(
      {
        type: 'card_example',
        x: 122,
        y: 90,
        w: 76,
        h: 60
      }
    )
    game.objects.push(
      ...fit(
        {
          message: 'This is a life choice. Activate it to feel its effects.',
          position: { x: 50, y: 75 },
          width: 220
        }
      )
    )
    game.objects.push(
      ...fit(
        {
          message: 'How your life and score is affected is clearly shown via the symbols and numbers next to them.',
          position: { x: 5, y: 95 },
          width: 115
        }
      )
    )
    game.objects.push(
      ...fit(
        {
          message: 'But there are also hidden effects which affect which choices are presented, e.g. you cannot get divorced before marrying.',
          position: { x: 202, y: 95 },
          width: 115
        }
      )
    )
    game.objects.push(
      ...fit(
        {
          message: 'Click anywhere to return to title. You can leave many other screens in the same way.',
          position: { x: 10, y: 180 },
          width: 300
        }
      )
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState(this.nextState)
    }
  }
}
