import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerHistory from './PlayerHistory'
import constants from '../data/constants'
import teams from '../data/teams'

let hasStarted = new Date(constants.startDate) < Date.now()

function getEmojiFromTeamName(name) {
  return Object.values(teams).filter(team => team.name === name)[0].emoji
}

class PlayerCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    let { player, countries } = this.props
    let { expanded } = this.state
    let selectedCountry = countries[player.number]


    return (
      <div>
        <div onClick={this.toggleExpand} style={{display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px', backgroundColor: expanded ? constants.colors.teal : ''}}>
          <div style={{width: '15%', textAlign: 'center', fontSize: '24px'}}><strong>{player.position}</strong></div>
          <div style={{width: '70%', fontSize: '24px'}}>
            {!hasStarted && selectedCountry && <span style={{fontSize: '24px', marginRight: '8px'}} role="img" aria-label="Country flag">🏳</span>}
            {hasStarted && selectedCountry && <span style={{fontSize: '24px', marginRight: '8px'}} role="img" aria-label="Country flag">{getEmojiFromTeamName(selectedCountry)}</span>}
            <strong>{player.name}</strong>
            </div>
          <div style={{width: '15%', textAlign: 'center', fontSize: '24px'}}><strong>{player.score}</strong></div>
        </div>
          {this.state.expanded &&
            <PlayerHistory player={player} />
          }
      </div>
    )
  }
}

PlayerCard.propTypes = {
  position: PropTypes.number,
  name: PropTypes.string,
  score: PropTypes.number,
  countries: PropTypes.object
}

export default PlayerCard
