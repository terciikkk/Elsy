import Grammar from './grammar'
import AdvancedActions from './actions'
import ContextDraw from './context_draw'
import SvgDraw from './svg_draw'
import Color from './color'
const $ = window.$;

class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.height = 100;
    this.width = 100;
    this.animation = 0;
    this.frame = 0;
  }

  start(settings) {
    this.stop();

    this.settings = $.extend(true, {}, settings || {});

    this.grammar = new Grammar(this.settings.grammar.start, this.settings.grammar.rules);

    this.actions = new AdvancedActions(this.settings.generate);

    this.animationStep = parseFloat(this.settings.animation.step);
    if (Number.isNaN(this.animationStep)) {
      this.animationStep = 0;
    }

    setTimeout(() => {
      this.draw();
    }, 10);
  }

  stop() {
  }

  _getDrawOptions() {
    let specOffset = this.settings.render.offset;
    let offset = {
      x: this.width / 2 + (specOffset.x || 0),
      y: this.height / 2 + (specOffset.y || 0)
    };
    let scale = (this.settings.render.zoom || 100) / 100;
    return {
      iterations: this.settings.render.iterations,
      x: offset.x,
      y: offset.y,
      scale: scale,
      rotation: this.settings.render.rotation,
      lineWidth: this.settings.render.lineWidth,
      color: Color.parse(this.settings.colors.lines)
    };
  }

  draw() {
    this.ctx.resetTransform();
    this.bg(Color.parse(this.settings.colors.background));

    this.actions.reset();
    this.actions.angle += this.animationStep * (this.frame || 0);
    console.log('Frame', this.frame);

    let draw = new ContextDraw(this.ctx, this.grammar, this.actions.actions, this._getDrawOptions());

    this.drawResult = draw.draw();
  }

  svgDraw(element) {
      this.actions.reset();
      this.actions.angle += this.animationStep * (this.frame || 0);

      let bg = Color.parse(this.settings.colors.background).str();

      let draw = new SvgDraw(this.ctx, this.grammar, this.actions.actions, this._getDrawOptions());

      let svgCode = draw.draw();
      let background = `<rect width="${this.width}" height="${this.height}" style="fill:${bg}"/>`;
      $(element).html(background + svgCode);
  }

  bg(color) {
    this.ctx.fillStyle = color.str();
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  autoscale() {
    let cX = (this.drawResult.x.max + this.drawResult.x.min) / 2;
    let cY = (this.drawResult.y.max + this.drawResult.y.min) / 2;

    let width = this.drawResult.x.max - this.drawResult.x.min;
    let height = this.drawResult.y.max - this.drawResult.y.min;
    if (width < 1) width = 1;
    if (height < 1) height = 1;

    let scale = Math.min((this.width - 30) / width, (this.height - 30) / height);
    let x = -cX * scale;
    let y = -cY * scale;
    return {
      scale: scale * 100,
      x,
      y
    };
  }

}

export default Engine;
