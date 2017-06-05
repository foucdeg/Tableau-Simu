import React, { PropTypes } from 'react'
import PlayerBadge from '../PlayerBadge/PlayerBadge'
import DateLabel from '../DateLabel/DateLabel'
import PeopleCountLabel from '../PeopleCountLabel/PeopleCountLabel'
import LocationLabel from '../LocationLabel/LocationLabel'

import './Scenar.css'

const Scenar = ({ data, subscribe }) => (
  <div className="Scenar" id={data.key}>
    {data.pictureUrl &&
      <div className="scenar-header">
        <img src={data.pictureUrl} alt={data.name} />
      </div>
    }
    <div className={'scenar-body' + (data.pictureUrl ? '' : ' no-picture')}>
      <h3>{data.name}</h3>
      <p className="description">{data.description}</p>
      <div className="people">
        { data.mjs.length > 0 &&
          <div className="mjs">
            {data.mjs.map((mj, index) =>
              <PlayerBadge
                player={mj}
                key={index}
                isMJ={ true }
              />
            )}
          </div>
        }
        { data.players.length > 0 &&
          <div className="players">
          {data.players.map((player, index) =>
            <PlayerBadge
              player={player}
              key={index}
              isMJ={ false }
            />
          )}
          </div>
        }
      </div>
      <div className="footer">
        <DateLabel
          validity={data.dateValidity}
          date={data.dateString}
        />
        <span className="spacer"></span>
        <PeopleCountLabel
          validity={data.peopleCountValidity}
          peopleCount={data.peopleCount}
        />
        <span className="spacer"></span>
        <LocationLabel
          validity={data.locationValidity}
          location={data.location.text}
          href={data.location.link}
        />
      </div>
    </div>
  </div>
)

Scenar.propTypes = {
  data: PropTypes.object.isRequired,
  subscribe: PropTypes.func.isRequired
}

export default Scenar
