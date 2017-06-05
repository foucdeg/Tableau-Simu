import React, { PropTypes } from 'react'
import './LocationLabel.css'

const LocationLabel = ({validity, location, href}) => (
  href ? (
    <a
      className={'footer-location ' + validity}
      target="_blank"
      href={href}
    >
      <i className="fa fa-map-marker before-text"></i>{ location }
    </a>
  ) : (
    <span className={'footer-location ' + validity}>
      <i className="fa fa-map-marker before-text"></i>{ location }
    </span>
  )
)

LocationLabel.propTypes = {
  validity: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  href: PropTypes.string
}

export default LocationLabel
