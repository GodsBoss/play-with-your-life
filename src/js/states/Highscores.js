import { line, LEFT, RIGHT } from '../font'
import State from '../State'

export default class Highscores extends State {
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
        type: 'screen_highscores',
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height,
        z: 0
      }
    )
    game.objects.push(
      {
        type: 'score_wealth',
        x: 50,
        y: TOP,
        w: 9,
        h: 9,
        z: 1000
      }
    )
    game.objects.push(
      {
        type: 'score_accomplishment',
        x: 110,
        y: TOP,
        w: 9,
        h: 9,
        z: 1000
      }
    )
    game.objects.push(
      {
        type: 'score_pleasure',
        x: 170,
        y: TOP,
        w: 9,
        h: 9,
        z: 1000
      }
    )
    game.objects.push(
      ...line(
        {
          message: 'TOTAL',
          position: { x: 230, y: TOP + 2 }
        }
      )
    )
    showList(game, { x:  65, y: TOP + 15}, game.data.highscores.lists.wealth.values)
    showList(game, { x: 125, y: TOP + 15}, game.data.highscores.lists.accomplishment.values)
    showList(game, { x: 185, y: TOP + 15}, game.data.highscores.lists.pleasure.values)
    showList(game, { x: 259, y: TOP + 15}, game.data.highscores.lists.total.values)
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState(this.nextState)
    }
  }
}

function showList(game, position, list) {
  console.log(game, position, list)
  list.forEach(
    (value, index) => {
      game.objects.push(
        ...line(
          {
            message: value.toString(),
            position: {
              x: position.x,
              y: position.y + index * 7
            },
            align: RIGHT
          }
        )
      )
    }
  )
}

const TOP = 50
