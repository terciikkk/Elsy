import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import ReactTooltip from 'react-tooltip'
import reactCSS from 'reactcss'
import './ColorPicker.css'
import './Tooltip.css'
const $ = window.$;

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = { displayColorPicker: false };
  }

  render() {
    let color = this.props.color || "#FF00FF";

    let style = $.extend({
        paddingBottom: '1em',
        paddingLeft: '4em',
        background: color,
        border: '0.2em solid rgb(73, 73, 73)',
        cursor: 'pointer'
      }, this.props.style);

    const styles = reactCSS({
      'default': {
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    let tooltip;
    let tooltipData;
    if (this.props.tooltip) {
      tooltip = <ReactTooltip class="custom-tooltip" id={this.props.tooltip} place="right" type="dark" effect="float">
                <span>{this.props.tooltip}</span>
              </ReactTooltip>
      tooltipData = this.props.tooltip
    }



    //TODO: fix offset when scrolling

    return (
      <div className="ColorPicker" data-tip data-for={tooltipData}>
      {tooltip}
        <span style={style} onClick={ this.handleClick }>&nbsp;</span>

        { this.state.displayColorPicker ?
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={color} disableAlpha={true} presetColors={[]} onChange={this._handleChange.bind(this)} />
          </div> : null }

      </div>
    )
  }


  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };


  _handleChange(color) {
    this.props.onChange(color.hex);
  }
}

export default Input;
