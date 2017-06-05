import React, { PropTypes, Component } from 'react'
import './MinMaxInput.css'

export default class MinMaxInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onClear: PropTypes.func,
    minInputRef: PropTypes.func,
    maxInputRef: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      min: null,
      max: null
    };

    this._minKeyDown = this._minKeyDown.bind(this);
    this._maxKeyDown = this._maxKeyDown.bind(this);
    this._minRef = this._minRef.bind(this);
    this._maxRef = this._maxRef.bind(this);
  }

  _minKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      this._maxNode.focus();
      this.setState({ min: e.target.value });
      e.preventDefault();
    }
    if (e.key === 'Backspace') {
      if (e.target.value === '' && this.props.onClear) {
        return this.props.onClear(e);
      }
    }
  }

  _maxKeyDown(e) {
    if ((e.key === 'Enter' || e.key === 'Tab') && this.props.onSubmit) {
      e.preventDefault();
      return this.setState({ max: e.target.value }, () => {
        this.props.onSubmit(this.state);
      });
    }
    if (e.key === 'Backspace' && e.target.value === '') {
      this._minNode.focus();
      e.preventDefault();
    }
  }

  _minRef(node) {
    this._minNode = node;

    if (this.props.minInputRef) {
      this.props.minInputRef(node);
    }
  }

  _maxRef(node) {
    this._maxNode = node;

    if (this.props.maxInputRef) {
      this.props.maxInputRef(node);
    }
  }

  render() {
    let {
      minInputRef: _minInputRef,
      maxInputRef: _maxInputRef,
      onSubmit: _onSubmit,
      onClear: _onClear,
      ...props
    } = this.props;

    return (
      <div className="MinMaxInput">
        <input
          name="min"
          type="number"
          min="0"
          max={this.state.max || 25}
          ref={this._minRef}
          onKeyDown={this._minKeyDown}
          placeholder="min"
          {...props}
        />
        <span className="separator">à</span>
        <input
          name="max"
          type="number"
          min={this.state.min || 0}
          max="25"
          ref={this._maxRef}
          onKeyDown={this._maxKeyDown}
          placeholder="max"
          {...props}
        />
      </div>
    );
  }
}
