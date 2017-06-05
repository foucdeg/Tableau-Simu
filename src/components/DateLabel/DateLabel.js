import React, { PropTypes } from 'react'

const DateLabel = ({validity, date}) => (
  <span className={'footer-date ' + validity}>
    <i className="fa fa-calendar before-text"></i>{ date }
  </span>
)

DateLabel.propTypes = {
  validity: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default DateLabel
