import State from '../State'

export default class GameOver extends State {
  constructor({ nextState, background, size}) {
    super()
    this.nextState = nextState
    this.background = background
    this.size = size
  }

  init(game) {
    game.data.highscores.add(game.data.score)
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
        type: 'game_over_' + endReasons.join('_'),
        x: IMAGE_POSITION.x,
        y: IMAGE_POSITION.y,
        w: 100,
        h: 128,
        z: 10000
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
