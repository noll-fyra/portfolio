import React from 'react'
import PropTypes from 'prop-types'
import MatchHeader from './MatchHeader'
import MatchResults from './MatchResults'
import MatchPrediction from './MatchPrediction'
import MatchPredictions from './MatchPredictions'
import constants from '../data/constants'

function MatchDetails({ match, database, number }) {
  let hasStarted = new Date(match.date) < Date.now()

  return (
    <div style={{width: '100%', maxWidth: '600px', marginBottom: '12px', backgroundColor: constants.colors.cream, padding: '12px', borderRadius: '8px'}}>
      <MatchHeader match={match} />
      {!hasStarted && <MatchPrediction match={match} database={database} number={number}/>}
      {hasStarted && <MatchResults match={match} />}
      {hasStarted && <MatchPredictions match={match} />}
    </div>
  )
}


MatchDetails.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    home_team: PropTypes.string.isRequired,
    away_team: PropTypes.string.isRequired,
    home_goals: PropTypes.number,
    away_goals: PropTypes.number,
    result: PropTypes.string
  }),
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}

export default MatchDetails
