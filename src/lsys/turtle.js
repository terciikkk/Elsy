import V from './vector';

class Turtle {
  constructor(options) {
    this._draw = options.draw;

    this._position = options.position || new V(0, 0);
    this._angle = options.angle || 0;

    this._stack = [];
  }

  get position() {
    return this._position;
  }
  get angle() {
    return this._angle;
  }

  back(step) {
    this.forward(-step);
  }

  forward(step) {
    let pos = this._position;
    this._position = this._position.add(V.fromAngle(this._angle % 360).mult(step));

    this._draw(pos, this._position);
  }

  move(step) {
    this._position = this._position.add(V.fromAngle(this._angle % 360).mult(step));
  }

  left(angle) {
    this._angle += angle;
  }

  right(angle) {
    this._angle -= angle;
  }

  push(data) {
    this._stack.push({
      position: this._position,
      angle: this._angle,
      data: data
    });
  }

  pop() {
    let state = this._stack.pop();
    this._angle = state.angle;
    this._position = state.position;
    return state.data;
  }

}

export default Turtle;
