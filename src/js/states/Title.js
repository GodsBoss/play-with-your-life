import { filters } from '../objects'
import Visible from './Visible'

export default class Title extends Visible {
  constructor({ background, size, image }) {
    super({ background, size })
  }

  init(game) {
    super.init(game)
    game.objects.push(
      {
        type: 'screen_title',
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: -5000
      }
    )
    ;['title_button_start', 'title_button_help', 'title_button_highscore'].forEach(
      (type, index) => {
        game.objects.push(
          {
            type: type,
            x: 131,
            y: 90 + index * 16,
            w: 57,
            h: 11,
            z: 1000
          }
        )
      }
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      const possibleButtons = game.objects.filter(
        filters.every(
          filters.byTypes('title_button_start', 'title_button_help', 'title_button_highscore'),
          filters.byPosition(event)
        )
      )
      if (possibleButtons.length !== 1) {
        return
      }
      game.nextState(NEXT_STATE_PER_BUTTON[possibleButtons[0].type])
    }
  }
}

const NEXT_STATE_PER_BUTTON = {
  title_button_start: 'play',
  title_button_help: 'help',
  title_button_highscore: 'highscores'
}
