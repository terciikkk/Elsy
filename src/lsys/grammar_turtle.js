class GrammarTurtle {
  constructor(turtle, grammar, actions, options) {
    this._grammar = grammar;
    this._turtle = turtle;
    this._actions = actions;
    this._options = options || {};
  }

  interpret(depth) {
    let buffer = this._grammar.generate(depth);
    //faster than for..of
    for (let i = 0; i < buffer.length; i++) {
      let action = this._actions[buffer[i]];
      if (action) {
        action(this._turtle);
      }
    }
  }

}

export default GrammarTurtle;
