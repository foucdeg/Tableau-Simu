import React, { Component, PropTypes } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import './ScenarForm.css'

class ScenarForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
  }

  handleName(e) {
    if (e.key === 'Enter') {
      this.setState({name: e.target.value});
    }
  }

  handleDescription(e) {
    if (e.key === 'Backspace' && e.target.value === '') {
      this.setState({name: undefined});
      this.nameInput.focus();
      e.preventDefault();
    }
  }

  render() {
    const { data } = this.props
    return (
      <div className="Scenar ScenarForm">
        <i className="fa fa-plus-square before-text"></i>
        <input
          type="text"
          ref={(input) => { this.nameInput = input; }}
          name="name"
          placeholder="On fait un jeu ?"
          defaultValue={data.name}
          onKeyPress={this.handleName}
        />
        { this.state.name &&
          <TextareaAutosize
            autoFocus
            style={{
              color: '#333',
              background: 'transparent',
              border: 0,
              borderStyle: 'none',
              borderColor: 'transparent',
              outline: 'none',
              outlineOffset: '0',
              boxShadow: 'none',
              width: '300px',
              marginLeft: '30px',
              resize: 'none',
              fontSize: '14px'
            }}
            name="description"
            placeholder="Description"
            defaultValue={data.description}
            onKeyDown={this.handleDescription}
          />
        }
      </div>
    )
  }

}

export default ScenarForm
