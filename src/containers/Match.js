import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      choosingTeam: false,
      home: 0,
      away: 0
    }
    this.editScore = this.editScore.bind(this)
    this.reset = this.reset.bind(this)
    this.chooseTeam = this.chooseTeam.bind(this)
    this.resetTeam = this.resetTeam.bind(this)
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

  editScore() {
    let isEditing = this.state.editing
    this.setState({editing: !isEditing})
    if(isEditing) {
      this.props.database.ref().child('matches/' + this.props.match.name).update({
        home_result: parseInt(this.state.home, 10),
        away_result: parseInt(this.state.away, 10),
        finished: true
      })
    }
  }

  reset() {
    let sure = window.confirm('Are you sure you want to reset the scores?')
    if (sure) {
      this.props.database.ref().child('matches/' + this.props.match.name).update({
      home_result: -1,
      away_result: -1,
      finished: false
    })
  }
  }

  chooseTeam(team) {
    var sure = window.confirm(`Are you sure you want to make ${team.name} the ${this.state.choosingTeam} team?`)
    if(sure) {
      let update = this.state.choosingTeam === 'home' ? {home_team: team} : {away_team: team}
      this.props.database.ref().child('matches/' + this.props.match.name).update(update)
      this.setState({choosingTeam: false})
    }
  }

  resetTeam(){
    let sure = window.confirm('Are you sure you want to reset both teams?')
    if (sure) {
      this.props.database.ref().child('matches/' + this.props.match.name).update({
      home_team: 'tbd',
      away_team: 'tbd'
    })
    this.setState({choosingTeam: false})
  } else {
    this.setState({choosingTeam: false})
  }
  }

  render() {
    const { match, teams, isAdmin } = this.props

    return (
      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto', marginBottom: '12px', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden'}}>
        <div style={{backgroundColor: '#ccdae5', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '4px 12px'}}>
          {isAdmin
          ? <i className={'fa fa-times'} style={{width: '20%', textAlign: 'left', cursor: 'pointer'}} onClick={this.reset}/>
          :  <span style={{width: '20%'}} />
          }
          <span style={{width: '60%', textAlign: 'center'}}>Match {match.name}</span>
          {isAdmin
          ? <i className={this.state.editing ? 'fa fa-check' : 'fa fa-pencil'} style={{width: '20%', textAlign: 'right', cursor: 'pointer'}} onClick={this.editScore}/>
          :  <span style={{width: '20%'}} />
          }
      </div>
      <div style={{with: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px'}}>
        {match.home_team.name
          ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <img src={match.home_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #ccdae5', objectFit: 'cover', marginBottom: '4px'}} alt={match.home_team.name} onClick={() => this.setState({choosingTeam: this.state.choosingTeam === 'away' || !this.state.choosingTeam ? 'home' : false })} />
          <b style={{textAlign: 'center'}}>{match.home_team.name}</b>
        </div>
        : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccdae5', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px'}} onClick={() => this.setState({choosingTeam: this.state.choosingTeam === 'away' || !this.state.choosingTeam ? 'home' : false })}>?</div>
        <b>TBD</b>
      </div>
      }

        <div style={{width: '40%'}}>
          <div style={{textAlign: 'center'}}><b>{match.name <= 48 ? `Group ${match.group.toUpperCase()}` : match.name <= 56 ? 'Round of 16' : match.name <= 60 ? 'Quarterfinals' : match.name <= 62 ? 'Semifinals' : match.name === 63 ? 'Third Place Playoff' : 'Finals'}</b></div>
          <div style={{display: 'flex', justifyContent: 'space-around', margin: '8px 0'}}>
            {this.state.editing
            ? <input type={'number'} style={{fontSize: '2.5em', width: '50%', textAlign: 'center'}} onChange={(e) => this.setState({home: e.target.value})} value={this.state.home}/>
            : <div style={{fontSize: '2.5em'}}>{match.finished ? match.home_result : ''}{match.penalties === 'home' && '*'}</div>
            }
            {this.state.editing
            ? <input type={'number'} style={{fontSize: '2.5em', width: '50%', textAlign: 'center'}} onChange={(e) => this.setState({away: e.target.value})} value={this.state.away}/>
            : <div style={{fontSize: '2.5em'}}>{match.finished ? match.away_result : ''}{match.penalties === 'away' && '*'}</div>
          }
          </div>
          <div style={{textAlign: 'center', color: 'darkGrey'}}>{new Date(match.date).getDate()} {new Date(match.date).getMonth() === 5 ? 'June' : 'July'} {new Date(match.date).getHours() > 12 ? new Date(match.date).getHours() - 12 : new Date(match.date).getHours()} {new Date(match.date).getHours() < 12 ? 'am' : 'pm'}</div>
        </div>

        {match.away_team.name
          ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <img src={match.away_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #ccdae5', objectFit: 'cover', marginBottom: '4px'}} alt={match.away_team.name} onClick={() => this.setState({choosingTeam: this.state.choosingTeam === 'home' || !this.state.choosingTeam ? 'away' : false })} />
          <b style={{textAlign: 'center'}}>{match.away_team.name}</b>
        </div>
        : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccdae5', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px'}} onClick={() => this.setState({choosingTeam: this.state.choosingTeam === 'home' || !this.state.choosingTeam ? 'away' : false })}>?</div>
        <b>TBD</b>
      </div>
      }
      </div>
      {isAdmin && (this.state.choosingTeam === 'home' || this.state.choosingTeam === 'away') &&
      <div>
        <h4 style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#ccdae5', padding: '4px 12px'}}>
          <i className={'fa fa-times'} onClick={this.resetTeam} style={{cursor: 'pointer'}}/>
          <span>Choose the {this.state.choosingTeam} team</span>
          <i className={'fa fa-chevron-up'} onClick={() => this.setState({choosingTeam: false})} style={{cursor: 'pointer'}}/>
        </h4>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '12px'}}>
        {Object.values(teams || {}).sort((a,b) => this.sortAlphabetically(a.name, b.name)).map(team =>
        <div key={team.name} style={{width: '50%', cursor: 'pointer'}} onClick={() => this.chooseTeam(team)}>
          <img src={team.flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={team.name}/> {team.name}
        </div>)}
      </div>
      </div>
      }
      </div>
    )
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired,
  teams: PropTypes.arrayOf(PropTypes.object),
  isAdmin: PropTypes.bool.isRequired,
  database: PropTypes.object.isRequired
}

export default Match
