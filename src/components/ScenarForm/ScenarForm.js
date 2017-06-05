import React, { Component, PropTypes } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';
import AutofillInput from '../AutofillInput/AutofillInput';
import MinMaxInput from '../MinMaxInput/MinMaxInput';
import './ScenarForm.css'

export default class ScenarForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.submitDate = this.submitDate.bind(this);
    this.clearDate = this.clearDate.bind(this);
    this.submitPeople = this.submitPeople.bind(this);
    this.clearPeople = this.clearPeople.bind(this);
  }

  handleName(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      this.setState({name: e.target.value, inputToFocus: 'descriptionInput'});
      e.preventDefault();
    }
  }

  handleDescription(e) {
    if (e.key === 'Backspace' && e.target.value === '') {
      this.setState({name: undefined, inputToFocus: 'nameInput'});
      e.preventDefault();
    }
    if ((e.key === 'Enter' && !e.getModifierState('Shift')) || e.key === 'Tab') {
      this.setState({description: e.target.value, inputToFocus: 'locationTextInput'});
      e.preventDefault();
    }
  }

  handleLocation(e) {
    if (e.key === 'Backspace' && e.target.value === '') {
      this.setState({description: undefined, inputToFocus: 'descriptionInput'});
      e.preventDefault();
    }
    if (e.key === 'Enter' || e.key === 'Tab') {
      this.setState({locationText: e.target.value, inputToFocus: 'minPeopleInput'});
      e.preventDefault();
    }
  }

  fillDate(partialDate) {
    if (!partialDate || !partialDate.match(/^\d?\d(\/\d{0,2}(\/\d{0,4})?)?$/g)) return '';

    let expectedDate = moment().startOf('day');
    let inOneYear = moment().add(1, 'years');
    while (!expectedDate.format('DD/MM/YYYY').startsWith(partialDate) && expectedDate < inOneYear) {
      expectedDate.add(1, 'days');
    }

    return expectedDate.format('DD/MM/YYYY').substring(partialDate.length);
  }

  submitDate(e) {
    this.setState({date: e.target.value});
    e.preventDefault();
  }

  clearDate(e) {
    this.setState({maxPeopleCount: undefined, inputToFocus: 'maxPeopleInput'});
    e.preventDefault();
  }

  submitPeople(peopleCount) {
    this.setState({ minPeopleCount: peopleCount.min, maxPeopleCount: peopleCount.max, inputToFocus: 'dateInput' });
  }

  clearPeople(e) {
    this.setState({locationText: undefined, inputToFocus: 'locationTextInput'});
    e.preventDefault();
  }

  componentDidUpdate() {
    this[this.state.inputToFocus].focus();
  }

  render() {
    const { data } = this.props
    return (
      <div className="Scenar ScenarForm">
        <div className="general-section">
          <i className="fa fa-plus-square"></i>
          <input
            type="text"
            ref={(input) => { this.nameInput = input; }}
            name="name"
            placeholder="On fait un jeu ?"
            defaultValue={data.name}
            onKeyDown={this.handleName}
          />
          <TextareaAutosize
            inputRef={(input) => { this.descriptionInput = input; }}
            style={{ display: this.state.name ? 'inherit': 'none' }}
            name="description"
            placeholder="Description"
            defaultValue={data.description}
            onKeyDown={this.handleDescription}
          />
        </div>
        <div className="location-section" style={{ display: this.state.description ? 'inherit': 'none'}}>
          <i className="fa fa-map-marker"></i>
          <input
            type="text"
            ref={(input) => { this.locationTextInput = input; }}
            name="locationText"
            placeholder="Lieu"
            onKeyDown={this.handleLocation}
          />
        </div>
        <div className="people-count-selection" style={{ display: this.state.locationText ? 'inherit': 'none'}}>
          <i className="fa fa-users"></i>
          <MinMaxInput
            minInputRef={(input) => { this.minPeopleInput = input; }}
            maxInputRef={(input) => { this.maxPeopleInput = input; }}
            onClear={this.clearPeople}
            onSubmit={this.submitPeople}
          />
        </div>
        <div className="date-section" style={{ display: this.state.maxPeopleCount ? 'inherit': 'none'}}>
          <i className="fa fa-calendar"></i>
          <AutofillInput
            inputRef={(input) => { this.dateInput = input; }}
            placeholder="Date 1 (ex: 23/06/2017)"
            fill={this.fillDate}
            onSubmit={this.submitDate}
            onClear={this.clearDate}
          />
        </div>
      </div>
    )
  }
}
