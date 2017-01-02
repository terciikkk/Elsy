import React, { Component } from 'react';
import './Section.css'

//what an ugly hack
const memory = {};

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = { colapsed: memory[this.props.text] || false };
  }

  render() {
    return (
      <div className="Section">
        <div className="Section-label" onClick={this.onClick.bind(this)}>
          {this.props.text}
          <img src={this.state.colapsed ? require('./icons/sbaleno.svg') :  require('./icons/rozbaleno.svg')} style={{
            float: 'right',
            width: '1em',
            height: '1em',
            margin: '0.4em',
            background: 'rgb(58, 58, 58)'
          }}/>
        </div>
        <div style={{ display: this.state.colapsed ? 'none':null }}>{this.props.children}</div>
      </div>
    )
  }

  onClick() {
    this.setState((prevState) => {
      prevState.colapsed = !prevState.colapsed;
      memory[this.props.text] = prevState.colapsed;
      return prevState;
    });
  }
}

export default Section;
