import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MatchDetails from './match/MatchDetails'
import stages from './data/stages'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { matches, database, number } = this.props
    let display = Object.keys(matches).map(key => ({...matches[key], id: key})).sort((a, b) => b.number < a.number).filter(match => match.stage === stages.group)


    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px'}}>
        <h1>Matches</h1>
        {display.map(match =>
          <MatchDetails key={match.id} match={match} database={database} number={number}/>
        )}
        </div>
    )
  }
}

Matches.propTypes = {
  matches: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}

export default Matches
