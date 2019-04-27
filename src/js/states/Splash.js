import State from '../State'

// Splash shows a single image on a background and jumps to the next state on click anywhere.
export default class Splash extends State {
  constructor({ nextState, background, image, size }) {
    super()
    this.nextState = nextState
    this.background = background
    this.image = image
    this.size = size
  }

  init(game) {
    game.objects.push(
      {
        type: this.background,
        x: 0,
        y: 0,
        w: size.width,
        h: size.height
      }
    )
    game.objects.push(
      {
        type: this.image,
        x: 0,
        y: 0,
        w: size.width,
        h: size.height
      }
    )
  }

  invoke(game, event) {
    if (event.type === 'click') {
      game.nextState(this.nextState)
    }
  }
}
