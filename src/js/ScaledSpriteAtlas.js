import { key } from './SpriteAtlas'

export class ScaledSpriteAtlas {
  constructor(unscaledSpriteAtlas, factor) {
    this.unscaledSpriteAtlas = unscaledSpriteAtlas
    this.factor = factor
    this.sprites = {}
  }

  getSprite(type, frame) {
    if (typeof this.sprites[key(type, frame)] === 'undefined') {
      this.createScaledSprite(type, frame)
    }
    return this.sprites[key(type, frame)]
  }

  all() {
    const sprites = []
    this.unscaledSpriteAtlas.all().forEach(
      (unscaledSprite) => {
        sprites.push(this.getSprite(unscaledSprite.type, unscaledSprite.frame))
      }
    )
    return sprites
  }

  allKeys() {
    return this.unscaledSpriteAtlas.allKeys()
  }

  createScaledSprite(type, frame) {
    this.sprites[key(type, frame)] = {
      type: type,
      frame: frame,
      image: scale(this.unscaledSpriteAtlas.getSprite(type, frame).image, this.factor)
    }
  }

  createAllScaledSprites() {
    this.unscaledSpriteAtlas.all().forEach(
      (sprite) => {
        const k = key(sprite.type, sprite.frame)
        if (typeof this.sprites[k] === 'undefined') {
          return
        }
        this.sprites[k] = this.createScaledSprite(sprite.type, sprite.frame)
      }
    )
  }
}

// scale takes an image (<canvas> or <img>) and returns a scaled copy.
function scale(image, factor) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width * factor
  canvas.height = image.height * factor
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0)
  if (factor == 1) { // Nothing to do, early return
    return canvas
  }
  const srcImageData = context.getImageData(0, 0, image.width, image.height)
  const destImageData = context.createImageData(canvas.width, canvas.height)
  for (let srcX = 0; srcX < image.width; srcX++) {
    for (let srcY = 0; srcY < image.height; srcY++) {
      let srcBaseIndex = 4 * (srcX + (srcY * image.width))
      for (let xOffset = 0; xOffset < factor; xOffset++) {
        for (let yOffset = 0; yOffset < factor; yOffset++) {
          let destX = srcX * factor + xOffset
          let destY = srcY * factor + yOffset
          let destBaseIndex = 4 * (destX + (destY * canvas.width))
          for (let colorOffset = 0; colorOffset < 4; colorOffset++) {
            destImageData.data[destBaseIndex+colorOffset] = srcImageData.data[srcBaseIndex+colorOffset]
          }
        }
      }
    }
  }
  context.putImageData(destImageData, 0, 0)
  return canvas
}
