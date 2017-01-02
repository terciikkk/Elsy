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

        //this.ctx.scale(0.5, 0.5);

        let stroke = this.options.color.str();
        let lineWidth = this.options.lineWidth || 0.1;

        let svgCode = '';

        svgCode += `<g transform="translate(${this.options.x || 0},${this.options.y || 0}) rotate(${this.options.rotation || 0}) scale(${this.options.scale || 1})">`

        let turtle = new Turtle({
          draw: (p1, p2) => {
            svgCode += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" style="stroke:${stroke};stroke-width:${lineWidth}" />`
            lines++;
          }
        });

        let grammarTurtle = new GrammarTurtle(turtle, this.grammar, this.actions)

        grammarTurtle.interpret(this.options.iterations || 5);

        svgCode += '</g>'

        let t1 = performance.now();
        //console.log('Took', (t1 - t0).toFixed(4), 'draw', lines);

        return svgCode;
  }
}

export default ContextDraw;
