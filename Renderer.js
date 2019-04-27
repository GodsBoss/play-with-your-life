import { sortCriteria, sorted } from './objects'
import { ScaledSpriteAtlas } from './ScaledSpriteAtlas'

export default class Renderer{
  constructor(canvas, atlas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.sourceAtlas = atlas
    this.atlas = atlas
    this.atlases = {
      1: atlas
    }
    this.factor = 1
  }

  setScaleFactor(factor) {
    if (typeof this.atlases[factor] == 'undefined') {
      this.atlases[factor] = new ScaledSpriteAtlas(this.sourceAtlas, factor)
    }
    this.atlas = this.atlases[factor]
    this.factor = factor
  }

  render(game) {
    this.context.fillStyle = '#000000'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

    sorted(sortCriteria.byZ)(game.objects).forEach(
      (obj) => {
        const frame = typeof obj.frame === 'number' ? obj.frame : 0
        this.context.drawImage(this.atlas.getSprite(obj.type, frame).image, Math.round(obj.x * this.factor), Math.round(obj.y * this.factor))
      }
    )
  }
}
