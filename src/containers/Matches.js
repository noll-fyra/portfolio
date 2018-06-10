import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: 'group',
      group: 'all'
    }
  }
  render() {
    const filteredMatches = !!this.props.matches
    ? this.props.matches
    .filter(match => (this.state.stages === 'group' && match.name <= 48) || (this.state.stages === 'knockout' && match.name > 48))
    .filter(match => (this.state.stages === 'knockout') || (this.state.stages === 'group' && this.state.group === 'all') || (this.state.stages === 'group' && match.group === this.state.group))
    : []

    const groupTable = Object.values(filteredMatches.reduce((obj, match) => {
      obj[match.home_team.name] = {
        name: match.home_team.name,
        flag: match.home_team.flag,
        played: match.finished ? (obj[match.home_team.name] ? obj[match.home_team.name].played : 0) + 1 : (obj[match.home_team.name] ? obj[match.home_team.name].played : 0),
        won: match.finished && match.home_result > match.away_result ? (obj[match.home_team.name] ? obj[match.home_team.name].won : 0) + 1 : (obj[match.home_team.name] ? obj[match.home_team.name].won : 0),
        drawn: match.finished && match.home_result === match.away_result ? (obj[match.home_team.name] ? obj[match.home_team.name].drawn : 0) + 1 : (obj[match.home_team.name] ? obj[match.home_team.name].drawn : 0),
        lost: match.finished && match.home_result < match.away_result ? (obj[match.home_team.name] ? obj[match.home_team.name].lost : 0) + 1 : (obj[match.home_team.name] ? obj[match.home_team.name].lost : 0),
        goalsFor: match.finished ? (obj[match.home_team.name] ? obj[match.home_team.name].goalsFor : 0) + match.home_result : (obj[match.home_team.name] ? obj[match.home_team.name].goalsFor : 0),
        goalsAgainst: match.finished ? (obj[match.home_team.name] ? obj[match.home_team.name].goalsAgainst : 0) + match.away_result : (obj[match.home_team.name] ? obj[match.home_team.name].goalsAgainst : 0),
      }
      obj[match.away_team.name] = {
        name: match.away_team.name,
        flag: match.away_team.flag,
        played: match.finished ? (obj[match.away_team.name] ? obj[match.away_team.name].played : 0) + 1 : (obj[match.away_team.name] ? obj[match.away_team.name].played : 0),
        won: match.finished && match.home_result < match.away_result ? (obj[match.away_team.name] ? obj[match.away_team.name].won : 0) + 1 : (obj[match.away_team.name] ? obj[match.away_team.name].won : 0),
        drawn: match.finished && match.home_result === match.away_result ? (obj[match.away_team.name] ? obj[match.away_team.name].drawn : 0) + 1 : (obj[match.away_team.name] ? obj[match.away_team.name].drawn : 0),
        lost: match.finished && match.home_result > match.away_result ? (obj[match.away_team.name] ? obj[match.away_team.name].lost : 0) + 1 : (obj[match.away_team.name] ? obj[match.away_team.name].lost : 0),
        goalsFor: match.finished ? (obj[match.away_team.name] ? obj[match.away_team.name].goalsFor : 0) + match.away_result : (obj[match.away_team.name] ? obj[match.away_team.name].goalsFor : 0),
        goalsAgainst: match.finished ? (obj[match.away_team.name] ? obj[match.away_team.name].goalsAgainst : 0) + match.home_result : (obj[match.away_team.name] ? obj[match.away_team.name].goalsAgainst : 0),
      }
      return obj
    },{})).sort((a,b) => ((b.won * 3 + b.drawn) - (a.won * 3 + a.drawn)) || ((b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)))

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['group', 'knockout'].map(stage =>
            <div key={stage} onClick={() => this.setState({stages: stage})} style={{cursor: 'pointer', width: '50%', backgroundColor: this.state.stages === stage ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{stage[0].toUpperCase().concat(stage.slice(1))}</b>
            </div>)}
        </div>

        {this.state.stages === 'group' &&
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(group =>
            <div key={group} onClick={() => this.setState({group: group})} style={{cursor: 'pointer', width: 'calc(100%/9)', backgroundColor: this.state.group === group ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{group.toUpperCase()}</b>
            </div>)}
        </div>
        }

        {this.state.stages === 'group' && this.state.group !== 'all' && !!this.props.matches &&
        <table style={{width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', marginBottom: '12px', borderRadius: '8px', padding: '12px'}}>
          <thead>
            <tr>
              <th />
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {groupTable.map((team, index) =>
        <tr key={team.name} style={{padding: '8px 12px'}}>
          <td style={{display: 'flex', alignItems: 'center', padding: '4px 0'}}>
            <img src={team.flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={team.name} />
            <b>{team.name}</b>
          </td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.played}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.won}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.drawn}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.lost}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.goalsFor}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.goalsAgainst}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.goalsFor - team.goalsAgainst}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.won * 3 + team.drawn}</td>
        </tr>)}
        </tbody>
      </table>
      }



        {!!this.props.matches &&
          filteredMatches
          .sort((a,b) => a.name - b.name)
      .map(match =>
        <div key={match.name} style={{width: '100%', maxWidth: '480px', margin: '0 auto', marginBottom: '12px', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden'}}>
          <div style={{backgroundColor: '#ccdae5', textAlign: 'center', padding: '4px 12px'}}>Match {match.name}</div>
        <div style={{with: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px'}}>
          {match.home_team.name
            ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
            <img src={match.home_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #ccdae5', objectFit: 'cover', marginBottom: '4px'}} alt={match.home_team.name} />
            <b style={{textAlign: 'center'}}>{match.home_team.name}</b>
          </div>
          : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccdae5', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>?</div>
          <b>TBD</b>
        </div>
        }

          <div style={{width: '40%'}}>
            <div style={{textAlign: 'center'}}><b>{match.name <= 48 ? `Group ${match.group.toUpperCase()}` : match.name <= 56 ? 'Round of 16' : match.name <= 60 ? 'Quarterfinals' : match.name <= 62 ? 'Semifinals' : match.name === 63 ? 'Third Place Playoff' : 'Finals'}</b></div>
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '8px 0'}}>
              <div style={{fontSize: '2.5em'}}>{match.finished ? match.home_result : ''}</div>
              <div style={{fontSize: '2.5em'}}>{match.finished ? match.away_result : ''}</div>
            </div>
            <div style={{textAlign: 'center', color: 'darkGrey'}}>{new Date(match.date).getDate()} {new Date(match.date).getMonth() === 5 ? 'June' : 'July'} {new Date(match.date).getHours() > 12 ? new Date(match.date).getHours() - 12 : new Date(match.date).getHours()} {new Date(match.date).getHours() < 12 ? 'am' : 'pm'}</div>
          </div>

          {match.away_team.name
            ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
            <img src={match.away_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #ccdae5', objectFit: 'cover', marginBottom: '4px'}} alt={match.away_team.name} />
            <b style={{textAlign: 'center'}}>{match.away_team.name}</b>
          </div>
          : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#ccdae5', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '4px'}}>?</div>
          <b>TBD</b>
        </div>
        }
        </div>
        </div>
      )}</div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object)
}

export default Matches
