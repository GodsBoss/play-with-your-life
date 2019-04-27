import State from '../State'

export default class Play extends State {
  constructor({ size, background }) {
    super()
    this.size = size
    this.background = background
  }

  init(game) {
    game.objects.push(
      {
        type: this.background,
        x: 0,
        y: 0,
        w: this.size.width,
        h: this.size.height
      }
    )
  }

  tick(game) {}

  invoke(game, event) {}
}
