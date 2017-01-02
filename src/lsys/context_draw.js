import Turtle from './turtle'
import GrammarTurtle from './grammar_turtle'
import Color from './color'


class ContextDraw {
  constructor(ctx, grammar, actions, options) {
    this.ctx = ctx;
    this.grammar = grammar;
    this.actions = actions;
    this.options = options || {};
  }

  draw() {
        let t0 = performance.now();
        let lines = 0;

        this.ctx.translate(this.options.x || 0, this.options.y || 0);
        let rotation = (this.options.rotation || 0);
        this.ctx.rotate(rotation / 180 * Math.PI);
        let scale = this.options.scale || 1;
        this.ctx.scale(scale, scale);
        this.ctx.strokeStyle = this.options.color.str()
        this.ctx.lineWidth = (this.options.lineWidth || 0.1) / scale;

        this.ctx.font = "20px Georgia";
        this.ctx.fillStyle = "red";

        let x = { max: Number.MIN_VALUE, min: Number.MAX_VALUE };
        let y = { max: Number.MIN_VALUE, min: Number.MAX_VALUE };

        let comp = (obj, val) => {
          if (val < obj.min) obj.min = val;
          if (val > obj.max) obj.max = val;
        }
        let compX = comp.bind(null, x);
        let compY = comp.bind(null, y);

        this.ctx.beginPath();

        let turtle = new Turtle({
          draw: (p1, p2) => {
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            lines++;

            let p1r = p1.rotate(rotation);
            let p2r = p2.rotate(rotation);

            compX(p1r.x);
            compX(p2r.x);
            compY(p1r.y);
            compY(p2r.y);

            if (lines % 1000 === 0) {
              let ms = performance.now() - t0;
              if (ms > 1000) {
                throw new Error('Rendering time exceeded');
              }
            }
          }
        });

        try {
          let grammarTurtle = new GrammarTurtle(turtle, this.grammar, this.actions)

          grammarTurtle.interpret(this.options.iterations || 0);
        } catch (er) {
          console.error(er);
          this.ctx.beginPath(); //reset path

          this.ctx.fillText("Error during rendering: " + er.message, 0, 0);
        }

        this.ctx.stroke();

        let t1 = performance.now();
        console.log(`Drawn ${lines} lines in ${(t1 - t0).toFixed(4)} ms.`);

        return {
          x,
          y
        };
  }
}

export default ContextDraw;
