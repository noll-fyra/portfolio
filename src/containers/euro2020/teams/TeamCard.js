import React from 'react'
import PropTypes from 'prop-types'
import constants from '../data/constants'

function TeamCard ({ country, isSelected, count }) {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 8px', marginBottom: '8px', backgroundColor: isSelected ? constants.colors.teal : constants.colors.cream, cursor: 'pointer', borderRadius: '12px'}}>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
        <span style={{fontSize: '48px', marginRight: '8px'}} role="img" aria-label="Country flag">{country.emoji}</span>
        <strong style={{fontSize: '24px'}}>{country.name}</strong>
      </div>
      {!!count && <strong style={{fontSize: '24px', marginRight: '16px'}}>{count}</strong>}
    </div>
  )
}


TeamCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired
  }),
  isSelected: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired
}

export default TeamCard
