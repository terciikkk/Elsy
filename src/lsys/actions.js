class AdvancedActions {

  constructor(options) {
    this.options = options || {};

    this._actions = {
      "F": (t) => t.forward(this.step),
      "G": (t) => t.forward(this.step),
      "+": (t) => t.left(this.angle),
      "-": (t) => t.right(this.angle),
      ")": (t) => this.angle *= 1 + this.angleStep,
      "(": (t) => this.angle *= 1 - this.angleStep,
      ">": (t) => this.step *= 1 + this.stepStep,
      "<": (t) => this.step *= 1 - this.stepStep,
      "|": (t) => t.left(180),
      "!": (t) => this.angle *= -1,
      "[": (t) => {
        t.push({
          angle: this.angle,
          step: this.step
        });
      },
      "]": (t) => {
        let data = t.pop();
        this.angle = data.angle;
        this.step = data.step;
      }
    };

    this.reset();
  }

  reset() {
    this.angle = this.options.angle || 0;
    this.step = this.options.step || 5;

    this.angleStep = this.options.angleStep || 0;
    this.stepStep = this.options.stepStep || 0;
  }

  get actions() {
    return this._actions;
  }
}

export default AdvancedActions;
