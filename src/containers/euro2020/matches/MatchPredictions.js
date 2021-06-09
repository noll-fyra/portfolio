import React, {Component} from 'react'
import PropTypes from 'prop-types'
import players from '../data/players'
import constants from '../data/constants'

function predictionMatchesResult({match, prediction}){
  switch(true) {
    case prediction === match.home_team:
    case prediction === match.away_team:
    case prediction === match.result:
      return true
    default:
      return false
  }
}

class MatchPredictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    let { match } = this.props
    let { isVisible } = this.state

    return (
      <div style={{width: '100%', borderTop: `1px solid ${constants.colors.teal}`, paddingTop: '8px', textAlign: 'center'}}>
        <button type="button" style={{cursor: 'pointer'}} onClick={this.toggle}><strong>{isVisible ? 'Hide' : 'Show'} Predictions</strong></button>

        {isVisible &&
          <table style={{width: '100%', marginTop: '8px'}}>
            {players
              .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase())
              .map((player, index) =>
                <tr key={player.name} style={{backgroundColor: index % 2 ? constants.colors.cream : constants.colors.teal}}>
                  <td style={{width: '50%', padding: '4px', textAlign: 'left'}}><strong>{player.name}</strong></td>
                  <td style={{width: '50%', padding: '4px', textAlign: 'left'}}><strong style={{color: predictionMatchesResult({match, prediction: match.predictions[player.number]}) ? constants.colors.red : ''}}>{match.predictions[player.number] || ""}</strong></td>
                </tr>)}
          </table>
        }
      </div>
    )
  }
}


MatchPredictions.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    home_team: PropTypes.string.isRequired,
    away_team: PropTypes.string.isRequired
  })
}

export default MatchPredictions
