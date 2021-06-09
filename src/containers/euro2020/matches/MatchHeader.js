import React from 'react'
import PropTypes from 'prop-types'
import CountdownTimer from './CountdownTimer'
import constants from '../data/constants'

function MatchHeader({match}) {
 return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', marginBottom: '8px', borderBottom: `1px solid ${constants.colors.teal}`}}>
      <strong style={{width: '33.3333%'}}>Match {match.number}</strong>
      <strong style={{width: '33.3333%', textAlign: 'center'}}>{match.stage}</strong>
      <CountdownTimer date={match.date} />
    </div>
 )
}

MatchHeader.propTypes = {
  match: PropTypes.shape({
    number: PropTypes.number.isRequired,
    stage: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
}

export default MatchHeader
