import { fit, line, LEFT, RIGHT } from '../font'
import Visible from './Visible'

export default class GameOver extends Visible {
  constructor({ nextState, background, size}) {
    super({ background, size })
    this.nextState = nextState
  }

  init(game) {
    super.init(game)
    game.data.highscores.add(game.data.score)
    try{
      window.localStorage.setItem('play_with_your_life.highscores', JSON.stringify(game.data.highscores.raw()))
    } catch(e) {
      // No local storage or no access or whatever.
    }
    game.objects.push(
      {
        type: 'screen_game_over',
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: 0
      }
    )
    const endReasons = []
    if (game.data.life.noMoreTime()) {
      endReasons.push('time')
    }
    if (game.data.life.noMoreHealth()) {
      endReasons.push('health')
    }
    if (game.data.life.noMoreMotivation()) {
      endReasons.push('motivation')
    }
    const endReason = endReasons.join('_')
    game.objects.push(
      {
        type: 'game_over_background',
        x: IMAGE_POSITION.x,
        y: IMAGE_POSITION.y,
        w: 100,
        h: 128,
        z: 5000
      }
    )
    game.objects.push(
      {
        type: `game_over_${endReason}`,
        x: IMAGE_POSITION.x,
        y: IMAGE_POSITION.y,
        w: 100,
        h: 128,
        z: 10000
      }
    )
    game.objects.push(
      ...fit(
        {
          message: MESSAGES[endReason],
          position: { x: 20, y: IMAGE_POSITION.y + 128 + 4 },
          width: 280
        }
      )
    )
    game.objects.push(
      ...line(
        {
          message: 'Points:',
          position: { x: IMAGE_POSITION.x + 104, y: IMAGE_POSITION.y }
        }
      )
    )
    game.objects.push(
      {
        type: 'char_X',
        x: IMAGE_POSITION.x + 104,
        y: IMAGE_POSITION.y + 22,
        w: 5,
        h: 5,
        z: 1000
      }
    )
    game.objects.push(
      {
        type: 'char_X',
        x: IMAGE_POSITION.x + 104,
        y: IMAGE_POSITION.y + 33,
        w: 5,
        h: 5,
        z: 1000
      }
    )
    game.objects.push(
      ...line(
        {
          message: '----------------',
          position: { x: IMAGE_POSITION.x + 104, y: IMAGE_POSITION.y + 44 }
        }
      )
    )
    game.objects.push(
      ...line(
        {
          message: game.data.score.wealth.toString(),
          position: { x: IMAGE_POSITION.x + 184, y: IMAGE_POSITION.y + 11 },
          align: RIGHT
        }
      )
    )
    game.objects.push(
      ...line(
        {
          message: game.data.score.accomplishment.toString(),
          position: { x: IMAGE_POSITION.x + 184, y: IMAGE_POSITION.y + 22 },
          align: RIGHT
        }
      )
    )
    game.objects.push(
      ...line(
        {
          message: game.data.score.pleasure.toString(),
          position: { x: IMAGE_POSITION.x + 184, y: IMAGE_POSITION.y + 33 },
          align: RIGHT
        }
      )
    )
    game.objects.push(
      ...line(
        {
          message: game.data.score.total().toString(),
          position: { x: IMAGE_POSITION.x + 184, y: IMAGE_POSITION.y + 55 },
          align: RIGHT
        }
      )
    )
    game.objects.push(
      {
        type: 'score_wealth',
        x: IMAGE_POSITION.x + 186,
        y: IMAGE_POSITION.y + 11 - 2,
        w: 9,
        h: 9,
        z: 1000
      }
    )
    game.objects.push(
      {
        type: 'score_accomplishment',
        x: IMAGE_POSITION.x + 186,
        y: IMAGE_POSITION.y + 22 - 2,
        w: 9,
        h: 9,
        z: 1000
      }
    )
    game.objects.push(
      {
        type: 'score_pleasure',
        x: IMAGE_POSITION.x + 186,
        y: IMAGE_POSITION.y + 33 - 2,
        w: 9,
        h: 9,
        z: 1000
      }
    )
  }

  tick(game) {}

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState(this.nextState)
    }
  }
}

const IMAGE_POSITION = {
  x: 40,
  y: 40
}

const MESSAGES = {
  time: 'You die peacefully while sleeping in your bed.',
  health: 'Your rotten body fails to function, no doctor could save you.',
  time_health: 'Old age and an unhealthy lifestyle destroyed you.',
  motivation: 'With your last drop of initiative, you end your life.',
  time_motivation: 'You are too old and tired to live anymore.',
  health_motivation: 'The doctor is not sure wether you died by self-harm or because of your miserable health.',
  time_health_motivation: 'Both physically and mentally, hope was lost, with no time to fix it.'
}
