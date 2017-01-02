import React, { Component } from 'react';
import './Button.css'
const $ = window.$;

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style;
    if (this.props.autoWidth) {
      style = {
        paddingLeft: '1em',
        paddingRight: '1em',
        width: 'auto'
      };
    } else {
      style = {};
    }

    if (this.props.noMarginLeft) {
      style.marginLeft = 0;
    }

    style = $.extend(style, this.props.style);

    let inner;
    if (this.props.icon) {
      inner = <img src={this.props.icon} style={{ verticalAlign: 'middle' }}/>
    } else {
      inner = <span>{this.props.text}</span>
    }
    return (
      <div className="Button" style={style} data-tip={this.props.tooltip} onClick={this.props.onClick}>
        {inner}
      </div>
    )
  }
}

export default Button;
