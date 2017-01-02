import React, { Component, Image } from 'react';
import './Input.css'
const $ = window.$;

class Input extends Component {
  constructor(props) {
    super(props);

    this.type = props.type || 'float';
    this.parser = this['_' + this.type + 'Parse'].bind(this);
    this.toStr = this['_' + this.type + 'ToStr'].bind(this);

    this._handleChange = this._handleChange.bind(this);

    this.state = { value: this.toStr(props.initialValue), valid: true };
  }

  componentWillReceiveProps(nextProps) {
    if (this._willReset) {
      this._willReset = false;
      this.setState({ value: this.toStr(nextProps.initialValue), valid: true });
    }
  }

  reset() {
    this._willReset = true;
  }

  render() {
    let classes = 'input';
    if (!this.state.valid) {
      classes += ' input-invalid';
    }

    let hasLabel = false;

    let icon;
    if (this.props.icon) {
      hasLabel = true;
      icon = <img src={this.props.icon}/>
    }

    let label;
    if (this.props.showLabel) {
      hasLabel = true;
      label = <div className="Input-label" style={this.props.labelStyle}>{this.props.label}</div>
    }

    let inputStyle = $.extend({ marginLeft: hasLabel ? '0.75em' : 0 }, this.props.inputStyle);

    let input;
    if (this.props.multiline !== true) {
      input = <input ref={c => this._input = c} style={inputStyle} type="text" className={classes} value={this.state.value} onChange={this._handleChange}/>;
    } else {
      classes += ' multiline-input';
      input = <textarea ref={c => this._input = c} style={inputStyle} rows={this.props.rows || 4} className={classes} value={this.state.value} onChange={this._handleChange}/>;
    }
    //<span>{this.props.label}</span>

    return (
      <div className="Input">
        {icon}
        {label}
        {input}
      </div>
    );
  }

  _handleChange() {
    let value = this._input.value;
    let parsed = this.parser(value);
    let valid = this.props.validate ? this.props.validate(parsed) : true;
    if (parsed === null || !valid) {
      this._clearThrotle();
      this.setState({ valid: false, value });
      return;
    }
    this.setState({ valid: true, value }, () => {
      this._clearThrotle();

      let throtle = this.props.throtle >= 0 ? this.props.throtle : 500;
      if (throtle === 0) {
        this.props.onChange(parsed);
      } else {
        this._throtle = setTimeout(() => {
          this._throtle = null;
          this.props.onChange(parsed);
        }, throtle);
      }
    });
  }

  _clearThrotle() {
    if (this._throtle) {
      clearTimeout(this._throtle);
      this._throtle = null;
    }
  }

  _floatParse(value) {
    if (!value.match(/^\-?\d+\.?\d*$/)) return null;
    value = parseFloat(value);
    if (Number.isNaN(value)) return null;
    return value;
  }
  _floatToStr(value) {
    return String(value || 0);
  }

  _vectorParse(value) {
    let match = value.match(/^(\-?\d+\.?\d*);(\-?\d+\.?\d*)$/);
    if (!match) return null;
    let x = parseFloat(match[1]);
    let y = parseFloat(match[2]);
    if (Number.isNaN(x) || Number.isNaN(y)) return null;
    return {x,y};
  }
  _vectorToStr(value) {
    value = value || { };
    return `${value.x || 0};${value.y || 0}`;
  }

  _grammarParse(value) {
    let lines = value.split('\n')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (lines.length === 0) {
      return null;
    }

    let grammar = {};

    for (let line of lines) {
      let pair = line.split(':');
      if (pair.length !== 2) {
        return null;
      }

      grammar[pair[0].trim()] = pair[1].trim();
    }

    return grammar;
  }

  _grammarToStr(value) {
    let str = '';
    for(let key in value) {
      if (value[key] === undefined) continue;
      str += `${key} : ${value[key]}\r\n`;
    }
    return str;
  }

  _textToStr(value) {
    return value;
  }

  _textParse(value) {
    value = value.trim();
    if (value.length === 0) return null;
    return value;
  }
}

export default Input;
