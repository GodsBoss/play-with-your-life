import cards from './cards'
import { EventListener as ScaledClickEventListener } from './click'
import Game from './Game'
import GameOver from './states/GameOver'
import Init from './states/Init'
import Splash from './states/Splash'
import loader from './loader'
import { start } from './Loop'
import Play from './states/Play'
import Renderer from './Renderer'
import Resizer from './Resizer'
import { SpriteAtlas } from './SpriteAtlas'
import sprites from './sprites'
import wait from './wait'

window.addEventListener('load', init, false)

// TPS is the amount of game ticks per second.
const TPS = 25

function init(e) {
  const size = {
    width: 320,
    height: 200
  }
  const canvas = createGUI(size)
  const image = loader.image("gfx.png")
  wait(
    [
      image.load()
    ],
    () => {
      const game = (new Game()).
        registerState('init', new Init({ nextState: 'title ', maxHighscoreListLength: 5 })).
        registerState('title', new Splash({ nextState: "play", background: "bg", image: "screen_title", size: size})).
        registerState('play', new Play({ size: size, background: "bg", cards: cards })).
        registerState('game_over', new GameOver({ nextState: 'title', background: 'bg', size: size }))
      game.nextState('title')
      start(
        (next) => {
          window.setTimeout(next, 1000 / TPS, next)
        },
        () => game.tick()
      )
      const clickListener = new ScaledClickEventListener()
      canvas.addEventListener(
        'click',
        clickListener.asListener(),
        false
      )
      clickListener.setCallback(
        (x, y) => game.invoke({ type: "click", x: x, y: y})
      )
      const atlas = (new SpriteAtlas(image.element)).extractSprites(sprites)
      const renderer = new Renderer(canvas, atlas)
      start(
        (next) => {
          window.requestAnimationFrame(next)
        },
        () => renderer.render(game)
      )
      const resizer = (new Resizer(size)).setMinimalFactor(2).setMargin(20, 10).connect(window)
      resizer.setOnResize(
        (factor) => {
          renderer.setScaleFactor(factor)
          canvas.width = size.width * factor
          canvas.height = size.height * factor
          clickListener.setScaled(factor)
        }
      )
      resizer.resize(window)
    }
  )
}

function createGUI(size) {
  const gui = document.createElement('canvas')
  gui.width = size.width
  gui.height = size.height
  document.body.appendChild(gui)
  const css = document.createElement('style')
  css.type = "text/css"
  css.innerHTML =
    `
      canvas {
        border: 1px solid #ddd;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    `
  document.head.appendChild(css)
  return gui
}
