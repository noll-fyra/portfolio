import React from 'react'
import PropTypes from 'prop-types'
import MatchDetails from './match/MatchDetails'
import stages from './data/stages'
import constants from './data/constants'

function Matches ({ matches, database, number }) {
  let display = Object.keys(matches).map(key => ({...matches[key], id: key})).sort((a, b) => b.number < a.number).filter(match => match.stage === stages.group.name)

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px'}}>
      <p style={{width: '100%', maxWidth: '600px', padding: '24px', backgroundColor: constants.colors.cream, borderRadius: '12px', marginBottom: '24px'}}>
        <b>Select a team (or Draw) to make your prediction. You can change your mind until the game starts. Everyone's prediction will be made available at kickoff.</b>
        </p>

      {display.map(match =>
        <MatchDetails key={match.id} match={match} database={database} number={number}/>
      )}
      </div>
  )
}

Matches.propTypes = {
  matches: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}

export default Matches
