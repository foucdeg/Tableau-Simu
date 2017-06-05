import React, { PropTypes } from 'react'
import './PlayerBadge.css'

const PlayerBadge = ({player, isMJ}) => (
  <img
    src={player.pictureUrl}
    title={player.name}
    className={ isMJ ? 'person-badge-lg mj' : 'person-badge player'}
    alt={player.name}
  />
)

PlayerBadge.propTypes = {
  player: PropTypes.object.isRequired,
  isMJ: PropTypes.bool.isRequired
}

export default PlayerBadge
