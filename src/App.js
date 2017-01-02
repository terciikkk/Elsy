import React, { Component } from 'react';
import './App.css';
import './Column.css';

import Canvas from './lsys/Canvas.js'
import Settings from './Settings.js'
import ImportExport from './ImportExport.js'
import GrammarEditor from './GrammarEditor.js'
import Button from './Button.js'
import AnimationControl from './AnimationControl.js'
import Gallery from './Gallery.js'
import Section from './Section.js'

const $ = window.$;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { settings: $.extend(true, {}, defaultSettings) };
  }

  componentWillUpdate(nextProps, nextState) {
  }

  render() {
    if (this.state.recreate) {
      return <div/>;
    }
    return (
      <div className="">
        <div className="app">
          <div className="column">
            <div className="logo" style={{ paddingLeft: '0.5em' }}>
              <img src={require('./icons/lsys_logo.svg')} style={{ background: 'none', width: '4em', height: '4em' }}/>
              <h1 style={{ color: '#b6b7b6', marginLeft: '0', display: 'inline-block', lineHeight: '1.3em', marginLeft: '0.3em' }}>Elsy</h1>
            </div>
            
            <Settings ref={c => this._settings = c} settings={this.state.settings} onChange={this.handleSettingsChange.bind(this)} />
            <AnimationControl ref={c => this._animation = c} animation={this.state.settings.animation} angle={this.state.settings.generate.angle} onChange={a => this.handleAnimChange(a)} onDrawFrame={frame => this.handleDrawFrame(frame)} />
            <ImportExport ref={c => this._export = c} onExport={this.handleExport.bind(this)} onImport={this.handleImport.bind(this)} />
            <GrammarEditor grammar={this.state.settings.grammar} onApply={g => this.handleGrammarApply(g)} />
            <Section text="Other">
              <Gallery openSystem={data => this.handleImport(data)} />
              <Button text="Autofit" autoWidth={true} noMarginLeft={true} style={{ width: '12em' }} onClick={this.onAutofit.bind(this)}/>
            </Section>
          </div>
          <div className="render">
          <Canvas ref={(c) => this._canvas = c} settings={this.state.settings} />
          </div>
        </div>
      </div>
    );
  }

  handleSettingsChange(change) {
    this.setState((prevState, props) => {
      return $.extend(true, {}, prevState, { settings: change });
    });
  }

  //REFACTOR
  handleGrammarApply(grammar) {
    this.setState((prevState, props) => {
      prevState.settings.grammar = grammar; //wrong
      return prevState;
    });
  }
  handleAnimChange(animation) {
    this.setState((prevState, props) => {
      prevState.settings.animation = animation; //wrong
      return prevState;
    });
  }
  handleDrawFrame(frame)  {
    this._canvas.frame = frame;
    this._canvas.draw();
  }

  handleExport(format) {
    if (format === 'json') {
      this._export.exportSettings(JSON.stringify(this.state.settings));
    } else {
      let base64Data = this._canvas.export(format);
      this._export.link(format, base64Data);
    }
  }

  handleImport(data) {
    //TODO: validate etc.
    this.setState({ recreate: true, settings: data }, () => {
      this.setState({ recreate: false })
    });
  }

  onAutofit() {
    let changes = this._canvas.autoscale();
    this._settings.autoscale(changes);
  }
}

let defaultSettings = {
  "grammar": {
    "start": "L",
    "rules": {
      "L": "S",
      "S": "F>+[F-Y[S]]F)G",
      "Y": "--[|F-F--FY]-",
      "G": "FGF[+F]+Y"
    }
  },
  "animation": {
    "step": 0.01,
    "speed": 30
  },
  "render": {
    "offset": {},
    "rotation": 0,
    "zoom": 100,
    "lineWidth": 0.1,
    "iterations": 40
  },
  "colors": {
    "background": '#191919',
    "lines": '#FFFFFF'
  },
  "generate": {
    "angle": -3832.29,
    "step": 8,
    "angleStep": 0.081453,
    "stepStep": 0.01
  }
};

export default App;
