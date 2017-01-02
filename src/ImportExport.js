import React, { Component } from 'react';
const $ = window.$
import downloadjs from 'downloadjs';
import Button from './Button';
import Section from './Section';
import './ImportExport.css';

class ImportExport extends Component {
  constructor(props) {
    super(props);
    this.state = { inputVisible: false };
  }

  render() {
    return (
      <div>
        <Section text="Export / Import">
          <Button noMarginLeft={true} text="SVG" onClick={this.onExport.bind(this, 'svg')} />
          <Button text="PNG" onClick={this.onExport.bind(this, 'png')} />
          <br/>
          <Button noMarginLeft={true} text="EXP" onClick={this.onExport.bind(this, 'json')}/>
          <Button text="IMP" onClick={this.onImportClick.bind(this)}/>
          <br/>
          <input className="file-input" ref={c => this._fileInput = c} type="file" style={{ display: this.state.inputVisible ? null : 'none' }}/>
        </Section>
      </div>
    );
  }

  componentDidMount() {
    this._fileInput.addEventListener('change', this._importFile.bind(this), false);
  }

  onExport(format) {
    this.props.onExport(format);
  }

  link(format, base64Data) {
    let mime;

    switch(format) {
      case 'svg':
        mime = 'image/svg+xml';
        break;
      case 'png':
        mime = 'image/png';
        break;
    }

    downloadjs(`data:${mime};base64,\n${base64Data}`, 'export.' + format, mime);
  }

  exportSettings(data) {
    downloadjs(data, "export.json", "text/plain");
  }

  onImportClick() {
    this.setState((prevState, props) => {
      return { inputVisible: !prevState.inputVisible };
    });
  }

  _importFile(e) {
    let file = e.target.files[0];
    if (!file) {
      return;
    }

    let reader = new FileReader();
    reader.onload = (e) => {
      let contents = e.target.result;

      try {
        let data = JSON.parse(contents);
        this.props.onImport(data);

        this.setState({ inputVisible: false });
      } catch (er) {
        console.error(er);
        //TODO: handle error
      }
    };
    reader.onerror = (e) => {
      console.error(reader.error);
      //TODO: handle error
    };
    reader.readAsText(file);
  }
}

export default ImportExport;
