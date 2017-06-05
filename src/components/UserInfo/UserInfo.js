import React, { PropTypes } from 'react'
import './UserInfo.css'

const UserInfo = ({user}) => (
  <div className="Scenar UserInfo">
    <img src={user.pictureUrl} className="person-badge-lg my-face" alt={user.name} title={user.name}/>
    <h2>{ user.name }</h2>
    <p className="my-email">{ user.email }</p>
  </div>
)

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserInfo
