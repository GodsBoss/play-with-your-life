export default class State{
  // init is called every time this state is freshly set to the game's current state.
  init(game) {}

  // tick is called every tick of the game if this is the current state.
  tick(game) {}

  invoke(game, event) {}
}
