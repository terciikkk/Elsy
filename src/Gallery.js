import React, { Component } from 'react';
import reactCSS from 'reactcss'
import Button from './Button';
import './Gallery.css'
import galleryData from './gallery_data';
const $ = window.$;
const COLUMNS = 6;

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
  }

  render() {

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
          background: 'rgba(255,255,255,0.3)'
        },
      },
    });

    let tiles = [];
    for(let file of galleryData.data) {
      tiles.push(
        <div onClick={this.openSystem.bind(this, file)}>
          <div className="tile-image" style={{
            backgroundImage: `url("${require('../gallery_resized/' + file.name + '.png')}")`
          }}/>
        </div>
      );
    }

    let rows = [];
    let row = [];
    for(let i = 0; i < tiles.length; i++) {
      row.push(<td key={i}>{tiles[i]}</td>)

      if (i === tiles.length - 1 || row.length === COLUMNS) {
        rows.push(<tr key={i}>{row}</tr>);
        row = [];
      }
    }
    let grid = <table>{rows}</table>;

    return (
      <div className="Gallery">
        <Button text="Open Gallery" autoWidth={true} noMarginLeft={true} style={{ }} onClick={this.handleOpen.bind(this)}/>

        { this.state.display ?
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={this.handleClose.bind(this)}/>
            <div className="Gallery-top"> {grid} </div>
          </div> : null }

      </div>
    )
  }

  handleClose() {
    this.setState({ display: false })
  }

  handleOpen() {
    this.setState({ display: true });
  }

  openSystem(file) {
    this.props.openSystem(file.data);
  }
}

export default Gallery;
