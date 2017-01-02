import React, { Component } from 'react';
import './AnimationControl.css';
import Input from './Input';
import Section from './Section';
import Button from './Button';
const $ = window.$;

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = $.extend({}, this.props.animation);
    this.state.frame = 0;
  }

  render() {
    return (
      <div>
        <Section text="Animation">
          <Input icon={require('./icons/speed.svg')} label="Step" initialValue={this.state.step} onChange={(v) => this.onChange({ step: v })} />
          <Input ref={c => this._frameInput = c} icon={require('./icons/time.svg')} label="Frame" initialValue={this.state.frame} onChange={(v) => this.onFrameChanged(v)} validate={Control.validateFrame} />
          <Button text="Play" icon={require('./icons/play.svg')} noMarginLeft={true} onClick={this.startAnimation.bind(this, 'start')}/>
          <Button text="Pause" icon={require('./icons/pause.svg')} onClick={this.stopAnimation.bind(this, 'stop')}/>
          <Button text="Reset" icon={require('./icons/refresh.svg')} onClick={this.resetAnimation.bind(this, 'reset')}/>
        </Section>
      </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    this.stopAnimation();

    this._interval = setInterval(() => {
      this.onFrame('++');
    }, 30);
  }
  stopAnimation() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  resetAnimation() {
    this.onFrame(0);
  }

  onFrameChanged(frame) {
    this.stopAnimation();
    this.onFrame(frame);
  }

  onFrame(frame) {
    if (this._frameInput) {
      this._frameInput.reset();
    }
    this.setState((prevState, props) => {
        prevState.frame = frame === '++' ? prevState.frame + 1 : frame;
        return prevState;
      }, () => {
        this.props.onDrawFrame(this.state.frame);
      });
  }

  static validateFrame(number) {
    return number === Math.round(number);
  }

  /*componentDidUpdate(prevProps, prevState) {
    for (let key of Object.keys(this.state)) {
      if (this.state[key] !== prevState[key]) {
        this.props.onChange(this.state);
        return;
      }
    }
  }*/

  onChange(value) {
    this.setState(value, () => {
      this.props.onChange(this.state);
    });
  }
}

export default Control;
