import React, { Component } from 'react';
import Engine from './engine'
const $ = window.$

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 300, height: 300 };
  }
  render() {
    return (
      <div ref={ c => this._container = c } className="Canvas">
        <canvas ref={ c => this._canvas = c } width={this.state.width} height={this.state.height} />
        <div>
          <svg ref={ c => this._svg = c } style={{display:'none'}} width={this.state.width} height={this.state.height} />
        </div>
      </div>
    );
  }
  componentWillMount() {
  }
  componentDidMount() {
    this._engine = new Engine(this._canvas);

    this.updateDimensions();
    this._resizeHandler = this.updateDimensions.bind(this);

    window.addEventListener("resize", this._resizeHandler);

    this._engine.start(this.props.settings);
  }

  componentWillUnmount() {
    this._engine.stop();

    window.removeEventListener("resize", this._resizeHandler);
  }

  componentWillUpdate(nextProps, nextState) {
    this._engine.width = nextState.width;
    this._engine.height = nextState.height;
    this._engine.start(nextProps.settings);
  }

  updateDimensions() {
      var w = window,
          d = document,
          documentElement = d.documentElement,
          body = d.getElementsByTagName('body')[0],
          width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
          height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

      width = this._container.offsetWidth;

      this.setState({ width: width - 5, height: height - 5 });
  }

  export(format) {
    switch(format) {
      case 'svg': return this.exportSvg();
      case 'png': return this.exportPng();
    }
  }

  exportSvg() {
    this._engine.svgDraw(this._svg);

    let svg = $(this._svg);
    svg.attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});
    svg.css('display', '');

    let html = svg.parent().html();

    svg.css('display', 'none');

    return window.btoa(html);
  }

  exportPng() {
    let img = this._canvas.toDataURL("image/png");
    img = img.replace('data:image/png;base64,','');
    return img;
  }

  draw() {
    this._engine.draw();
  }

  set frame(value) {
    this._engine.frame = value;
  }

}

export default Canvas;
