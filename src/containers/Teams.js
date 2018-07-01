import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: null,
      eliminated: 'active'
    }
    this.setTeam = this.setTeam.bind(this)
    this.eliminate = this.eliminate.bind(this)
  }

  sortAlphabetically(first, second) {
    switch(true) {
      case first > second:
        return 1
      case first < second:
        return -1
      default:
        return -1
    }
  }

  setTeam(name){
    this.setState({team: this.state.team === name ? null : name})
  }

  eliminate(name) {
    if (this.props.number !== '+6587427184') { return }
    let sure =  window.confirm(`Are you sure you want to eliminate ${name}?`)
    if (sure) {
      let teams = this.props.teams.slice()
      let index = Object.values(teams).map(t => t.name).indexOf(name)
      let team = Object.assign(teams[index])
      team.eliminated = true
      teams[index] = team
      this.props.database.ref().child('teams/').set(teams)
    }
  }

  render() {
    const filteredMatches = !!this.props.matches
    ? this.props.matches
    .filter(match => (match.home_team && match.home_team.name === this.state.team) || (match.away_team && match.away_team.name === this.state.team))
    // .filter(match => match.home_result !== -1 && match.away_result !== -1)
    : []

    return (
      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['all', 'active', 'eliminated'].map(status =>
            <div key={status} onClick={() => this.setState({eliminated: status})} style={{cursor: 'pointer', width: '50%', backgroundColor: this.state.eliminated === status ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{status[0].toUpperCase().concat(status.slice(1))}</b>
            </div>)}
        </div>

        {Object.values(this.props.teams)
          .sort((a,b) => this.sortAlphabetically(a.name, b.name))
          .filter(t => this.state.eliminated === 'all' || (this.state.eliminated === 'active' && !t.eliminated) || (this.state.eliminated === 'eliminated' && t.eliminated))
          .map(t =>
        <div key={t.name} onClick={() => this.setTeam(t.name)} style={{backgroundColor: this.state.team === t.name ? '#ccdae5' : ''}}>
          <div style={{display: 'flex', padding: '4px 8px', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <img src={t.flag} alt={t.name} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5'}} />
          <h3 style={{marginLeft: '8px'}}>{t.name}</h3>
        </div>
          <i className={t.eliminated ? 'fa fa-times' : 'fa fa-check'} onClick={() => this.eliminate(t.name)} style={{color: t.eliminated ? '#ccdae5' : 'gold', backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5em'}} />
        </div>

        {t.name === this.state.team &&
        <div style={{backgroundColor: 'white', border: '1px solid #ccdae5', padding: '8px'}}>
          {filteredMatches.map(m =>
          <div key={m.name} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <div style={{display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'flex-end'}}>
              {m.home_team.name === t.name && <img src={m.home_team.flag} style={{width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5'}} alt={m.home_team.name} />}
              <b style={{marginLeft: '8px'}}>{m.home_team.name}</b>
            </div>

            <div style={{display: 'flex', width: '20%', alignItems: 'center', justifyContent: 'center'}}>
              <b>{m.home_result > -1 ? m.home_result : ''}</b>
              <b>&nbsp;-&nbsp;</b>
              <b>{m.away_result > -1 ? m.away_result : ''}</b>
            </div>

            <div style={{display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'flex-start'}}>
              {m.away_team.name === t.name && <img src={m.away_team.flag} style={{width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '8px'}} alt={m.away_team.name} />}
              <b>{m.away_team.name}</b>
            </div>
          </div>)}
          </div>
        }
      </div>)}
      </div>
    )
  }
}

Teams.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  teams: PropTypes.arrayOf(PropTypes.object),
  number: PropTypes.string,
  database: PropTypes.object.isRequired
}

export default Teams
