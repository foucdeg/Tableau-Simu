import React, { PropTypes, Component } from 'react'
import './AutofillInput.css'

export default class AutofillInput extends Component {
  static propTypes = {
    fill: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    inputRef: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      fill: ''
    };

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onRootDOMNode = this._onRootDOMNode.bind(this);
    this._selectPartOfInput = this._selectPartOfInput.bind(this);
  }

  _selectPartOfInput(input, start, length) {
    if (!input) return;
    input.setSelectionRange(start, start + length);
    input.focus();
  }

  _onKeyDown(e) {
    if (e.key === 'Enter' && this.props.onSubmit) {
      return this.props.onSubmit(e);
    }
    if (e.key === 'Backspace') {
      if (e.target.value === '' && this.props.onClear) {
        return this.props.onClear(e);
      }
      if (this.state.fill !== '') {
        this.setState({value: e.target.value.slice(0, -(this.state.fill.length + 1))});
      }
    }
    if (e.key === 'Tab') {
      this.setState({value: e.target.value, fill: '' });
      e.preventDefault();
    }
  }

  _onChange(e) {
    this.setState({value: e.target.value, fill: this.props.fill(e.target.value)});
  }

  _onRootDOMNode(node) {
    this._rootDOMNode = node;

    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  };

  componentDidUpdate() {
    this._selectPartOfInput(this._rootDOMNode, this.state.value.length, this.state.fill.length);
  }

  render() {
    let {
      fill: _fill,
      inputRef: _inputRef,
      onSubmit: _onSubmit,
      onClear: _onClear,
      ...props
    } = this.props;

    return (
      <input
        type="text"
        className="AutofillInput"
        name="date[]"
        ref={this._onRootDOMNode}
        onKeyDown={this._onKeyDown}
        onChange={this._onChange}
        value={this.state.value + this.state.fill}
        {...props}
      />
    );
  }
}
