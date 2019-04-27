import State from './State'

export default class Game{
  constructor(){
    // Contains game-relevant data. Survives state switches.
    this.data = {}

    // Contains objects to be rendered. Cleared on state switch.
    this.objects = []

    // Initially, a NOP state.
    this.state = new State()

    // All states this game knows.
    this.states = {}
  }

  registerState(id, state) {
    this.states[id] = state
    return this
  }

  nextState(id) {
    const newState = this.states[id]
    if (typeof newState === 'undefined') {
      throw new Error(`Unknown state ${id}`)
    }
    this.state = newState
    this.objects = []
    this.state.init(this)
  }

  tick() {
    this.state.tick(this)
  }

  invoke(event) {
    this.state.invoke(this, event)
  }
}
