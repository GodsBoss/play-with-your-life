import State from '../State'

export default class Visible extends State {
  constructor({ background, size }) {
    super()
    this.background = background
    this.size = size
  }

  init(game) {
    super.init(game)
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
  }
}
