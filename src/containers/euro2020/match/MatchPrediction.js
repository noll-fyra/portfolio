import React, { Component}  from 'react'
import PropTypes from 'prop-types'
import constants from '../data/constants'
import stages from '../data/stages'
import teams from '../data/teams'

function getEmojiFromTeamName(name) {
  return Object.values(teams).filter(team => team.name === name)[0].emoji
}

class MatchPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.chooseOption = this.chooseOption.bind(this)
  }

  chooseOption(option) {
    let { match, database, number } = this.props
    let hasMatchStarted = new Date(match.date) < Date.now()

    if (hasMatchStarted) return

    let prediction = {}
    prediction[number] = option

    database
      .ref(constants.urlPath + match.id + '/predictions')
      .update(prediction)
  }

  render() {
    let { match, number } = this.props
    let home = {
      name: match.home_team,
      emoji: getEmojiFromTeamName(match.home_team)
    }
    let draw = {
      name: 'Draw',
      emoji: "－"
    }
    let away = {
      name: match.away_team,
      emoji: getEmojiFromTeamName(match.away_team)
    }
    let options = match.stage === stages.group ? [home, draw, away] : [home, away]
    let selected = !!match.predictions && number && match.predictions[number] ? match.predictions[number] : null

    return (
      <div style={{width: '100%'}}>
        {options.map(option =>
          <button key={option.name} type="button" style={{width: `calc(100%/${options.length})`, textAlign: 'center', padding: '8px', backgroundColor: selected === option.name ? constants.colors.teal : 'transparent', cursor: 'pointer', borderRadius: '8px'}} onClick={() => this.chooseOption(option.name)}>
            <span style={{fontSize: '48px', color: selected === option.name ? constants.colors.cream : ''}} role="img" aria-label="Country flag">{option.emoji}</span>
            <br />
            <strong style={{fontSize: '16px', color: selected === option.name ? constants.colors.cream : ''}}>{option.name}</strong>
          </button>
        )}
      </div>
    )
  }
}


MatchPrediction.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string.isRequired,
    home_team: PropTypes.string.isRequired,
    away_team: PropTypes.string.isRequired
  }),
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}

export default MatchPrediction
