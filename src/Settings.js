import React, { Component } from 'react';
import Input from './Input';
import './Settings.css'
import ColorPicker from './ColorPicker';
import Section from './Section';

class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let settings = this.props.settings;
    return (
      <div className="Settings">
        <Section text="Drawing">
          <Input icon={require('./icons/offset.svg')} label="Offset" type="vector" initialValue={settings.render.offset} onChange={(v) => this._handleChange({ render: { offset: v } })} />
          <Input icon={require('./icons/size.svg')} label="Zoom" initialValue={settings.render.zoom} onChange={(v) => this._handleChange({ render: { zoom: v } })} />
          <Input icon={require('./icons/rotate.svg')} label="Rotation" initialValue={settings.render.rotation} onChange={(v) => this._handleChange({ render: { rotation: v } })} />
          <Input icon={require('./icons/iteration.svg')} label="Iterations" initialValue={settings.render.iterations} onChange={(v) => this._handleChange({ render: { iterations: v } })} />

          <Input icon={require('./icons/width.svg')} label="Line Width" initialValue={settings.render.lineWidth} onChange={(v) => this._handleChange({ render: { lineWidth: v } })} />

          <div className="Input">
            <img src={require("./icons/colour.svg")} style={{ marginRight: '0.5em' }}/>
            <ColorPicker label="Line Color" color={settings.colors.lines} style={{ borderRightWidth: 0, marginLeft: '0.2em' }} onChange={(v) => this._handleChange({ colors: { lines: v } })}/>
            <ColorPicker label="Background" color={settings.colors.background} style={{ borderLeftWidth: 0 }}  onChange={(v) => this._handleChange({ colors: { background: v } })} />
          </div>

          <Input icon={require('./icons/angle.svg')} label="Angle" initialValue={settings.generate.angle} onChange={(v) => this._handleChange({ generate: { angle: v } })} />
          <Input icon={require('./icons/step.svg')} label="Line" initialValue={settings.generate.step} onChange={(v) => this._handleChange({ generate: { step: v } })} />
          <Input icon={require('./icons/step_angle.svg')} label="Angle &#916;" initialValue={settings.generate.angleStep} onChange={(v) => this._handleChange({ generate: { angleStep: v } })} />
          <Input icon={require('./icons/step_step.svg')} label="Line &#916;" initialValue={settings.generate.stepStep} onChange={(v) => this._handleChange({ generate: { stepStep: v } })} />
        </Section>
      </div>
    );
  }

  _handleChange(change)  {
    this.props.onChange(change);
  }
}

export default Panel;
