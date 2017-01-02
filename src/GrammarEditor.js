import React, { Component } from 'react';
import './GrammarEditor.css';
import Input from './Input';
import Section from './Section';
import Button from './Button';
const $ = window.$;

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.grammar;
  }

  render() {
    return (
      <div>
        <Section text="Grammar">
          <Input label="Initial" showLabel={true} labelStyle={{ width: '3.5em'}} inputStyle={{ width: '7.75em' }} type="text" throtle={0} initialValue={this.state.start} onChange={(v) => this.onInitChanged(v)} />
          <Input label="Rules" type="grammar" multiline={true} rows={10} throtle={0} initialValue={this.state.rules} onChange={(v) => this.onGrammarChanged(v)} />
          <Button text="Apply" autoWidth={true} noMarginLeft={true} style={{ marginTop: 0 }} onClick={this.onApply.bind(this)}/>
        </Section>
      </div>
    );
  }

  onGrammarChanged(v) {
    this.setState({ rules: v });
  }
  onInitChanged(init) {
    this.setState({ start: init });
  }

  onApply() {
    let grammar = $.extend(true, {}, this.state);
    this.props.onApply(grammar);
  }
}

export default Editor;
