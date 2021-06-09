import React from 'react'
import PropTypes from 'prop-types'
import teams from '../data/teams'

function getEmojiFromTeamName(name) {
  return Object.values(teams).filter(team => team.name === name)[0].emoji
}

function MatchResults({ match }) {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', padding: '8px'}}>
      <div style={{width: '33.3333%', textAlign: 'center'}}>
        <span style={{fontSize: '48px'}} role="img" aria-label="Country flag">{getEmojiFromTeamName(match.home_team)}</span>
        <br />
        <strong style={{fontSize: '16px'}}>{match.home_team}</strong>
      </div>

      <div style={{width: '14%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <span style={{fontSize: '36px'}}>{match.home_goals || " "}</span>
      </div>

      <div style={{width: '5.3333%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <span style={{fontSize: '36px'}}>-</span>
      </div>

      <div style={{width: '14%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <span style={{fontSize: '36px'}}>{match.away_goals || " "}</span>
      </div>

      <div style={{width: '33.3333%', textAlign: 'center'}}>
        <span style={{fontSize: '48px'}} role="img" aria-label="Country flag">{getEmojiFromTeamName(match.away_team)}</span>
        <br />
        <strong style={{fontSize: '16px'}}>{match.away_team}</strong>
      </div>
    </div>
  )
}


MatchResults.propTypes = {
  match: PropTypes.shape({
    home_team: PropTypes.string.isRequired,
    away_team: PropTypes.string.isRequired,
    home_goals: PropTypes.number.isRequired,
    away_goals: PropTypes.number.isRequired
  })
}

export default MatchResults
