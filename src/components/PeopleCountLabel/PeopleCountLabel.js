import React, { PropTypes } from 'react'

const PeopleCountLabel = ({validity, peopleCount}) => (
  <span className={'footer-people ' + validity}>
    <i className="fa fa-users before-text"></i>{ peopleCount }
  </span>
)

PeopleCountLabel.propTypes = {
  validity: PropTypes.string.isRequired,
  peopleCount: PropTypes.string.isRequired
}

export default PeopleCountLabel
