import React from 'react'
import PropTypes from 'prop-types'
import constants from '../data/constants'
import stages from '../data/stages'
import teams from '../data/teams'

const teamsAndDraw = {...teams, draw: {
    name: 'Draw',
    emoji: '－'
  }
}

function PlayerHistory({ player }) {
  return (
    <table style={{width: '100%', border: `1px solid ${constants.colors.teal}`, padding: '8px'}}>
      {Object.values(stages).map(stage =>
        <tbody key={stage.name}>
          <tr>
            <td style={{padding: '16px 8px 0px 8px'}}><strong>{stage.name}</strong></td>
          </tr>

          {player.predictions
            .filter(prediction => prediction.match.stage === stage.name)
            .map((prediction, index) =>
              <tr key={prediction.match.number} style={{backgroundColor: index % 2 ? '' : constants.colors.cream}}>
                <td style={{width: '50%', padding: '4px 8px'}}>{`${prediction.match.home_team} v ${prediction.match.away_team}`}</td>
                <td style={{width: '35%', padding: '4px 8px'}}>
                  {!!prediction && !!prediction.prediction && <strong>{Object.values(teamsAndDraw).filter(team => team.name === prediction.prediction)[0].emoji} {prediction.prediction}</strong>}
                </td>
                <td style={{width: '15%', padding: '4px 8px', textAlign: 'center'}}>
                  <strong>{prediction.points}</strong>
                </td>
                </tr>
                )}
            </tbody>
          )}
    </table>
  )
}

PlayerHistory.propTypes = {
  player: PropTypes.shape({
    match: PropTypes.shape({
      stage: PropTypes.string.isRequired
    }),
    predictions: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      home_team: PropTypes.string,
      away_team: PropTypes.string,
      prediction: PropTypes.string,
      points: PropTypes.number
    }))
  })
}

export default PlayerHistory
