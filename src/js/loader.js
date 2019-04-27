class Image {
  constructor(src) {
    this.src = src
  }

  load() {
    return (finished) => {
      this.element = document.createElement('img')
      this.element.addEventListener(
        'load',
        finished,
        false
      )
      this.element.src = this.src
    }
  }
}

function image(src) {
  const img = new Image(src)
  return img
}

const loader = {
  image
}

export default loader
