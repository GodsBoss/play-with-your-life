export class SpriteAtlas {
  // source is an <img> element, used as source for all sprites.
  constructor(source) {
    this.source = source
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = this.source.width
    canvas.height = this.source.height
    this.sprites = {}
  }

  extractSprites(sprites) {
    sprites.forEach(
      (sprite) => {
        this.extractSprite(sprite)
      }
    )
    return this
  }

  extractSprite(spriteInfo) {
    let frames = typeof spriteInfo['frames'] === "number" ? spriteInfo['frames'] : 1
    let direction = typeof spriteInfo['dir'] !== "undefined" ? spriteInfo['dir'] : HORIZONTAL
    const type = spriteInfo.type
    if (typeof this.sprites[key(type, 0)] !== "undefined") {
      throw new Error(`Sprite type ${type} already used!`)
    }
    for(let frame = 0; frame < frames; frame++) {
      this.sprites[key(spriteInfo.type, frame)] = {
        type: spriteInfo.type,
        frame: frame,
        image: createSprite(
          this.source,
          {
            x: spriteInfo.x + frame * spriteInfo.w * direction.x,
            y: spriteInfo.y + frame * spriteInfo.h * direction.y
          },
          {
            w: spriteInfo.w,
            h: spriteInfo.h
          }
        )
      }
    }
    return this
  }

  getSprite(type, frame) {
    const sprite = this.sprites[key(type, frame)]
    if (typeof sprite === 'undefined') {
      throw new Error(`Sprite key ${key} with frame ${frame} unknown`)
    }
    return sprite
  }

  all() {
    const sprites = []
    Object.keys(this.sprites).forEach(
      (key) => {
        sprites.push(this.sprites[key])
      }
    )
    return sprites
  }

  allKeys() {
    const ids = []
    for(var id in this.sprites) {
      ids.push(id)
    }
    return ids
  }
}

function createSprite(source, pos, size) {
  const canvas = document.createElement('canvas')
  canvas.width = size.w
  canvas.height = size.h
  const ctx = canvas.getContext('2d')
  ctx.drawImage(source, pos.x, pos.y, size.w, size.h, 0, 0, size.w, size.h)
  return canvas
}

export const HORIZONTAL = { x: 1, y: 0 }
export const VERTICAL = { x: 0, y: 1 }

export function key(type, frame) {
  return `${type}-${frame}`
}
