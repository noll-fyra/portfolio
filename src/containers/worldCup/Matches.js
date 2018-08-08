import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Match from './Match'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: 'knockout',
      group: 'all',
      knockout: 'all'
    }
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

  render() {
    const filteredMatches = !!this.props.matches
    ? this.props.matches
    .filter(match => (this.state.stages === 'group' && match.name <= 48) || (this.state.stages === 'knockout' && match.name > 48))
    .filter(match => (this.state.stages === 'knockout' && this.state.knockout === 'all') || (this.state.stages === 'knockout' && this.state.knockout === 'r16' && match.name > 48 && match.name < 57) || (this.state.stages === 'knockout' && this.state.knockout === 'qf' && match.name > 56 && match.name < 61) || (this.state.stages === 'knockout' && this.state.knockout === 'sf' && match.name > 60 && match.name < 63) || (this.state.stages === 'knockout' && this.state.knockout === '3rd' && match.name === 63) || (this.state.stages === 'knockout' && this.state.knockout === 'f' && match.name === 64) || (this.state.stages === 'group' && this.state.group === 'all') || (this.state.stages === 'group' && match.group === this.state.group))
    : []

    // const teams = this.props.teams ? this.props.teams.reduce((obj, team) => {
    //   obj[team.name] = team
    //   return obj
    // },{}) : {}

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
    },{}))
    .sort(this.sortAlphabetically)
    .sort((a,b) => ((b.won * 3 + b.drawn) - (a.won * 3 + a.drawn)) || (((b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)) || b.goalsFor - a.goalsFor))

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['group', 'knockout'].map(stage =>
            <div key={stage} onClick={() => this.setState({stages: stage})} style={{cursor: 'pointer', width: '50%', backgroundColor: this.state.stages === stage ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{stage[0].toUpperCase().concat(stage.slice(1))}</b>
            </div>)}
        </div>

        {this.state.stages === 'group'
        ? <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(group =>
            <div key={group} onClick={() => this.setState({group: group})} style={{cursor: 'pointer', width: 'calc(100%/9)', backgroundColor: this.state.group === group ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{group.toUpperCase()}</b>
            </div>)}
        </div>
        : <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['all', 'r16', 'qf', 'sf', '3rd', 'f'].map(knockout =>
            <div key={knockout} onClick={() => this.setState({knockout: knockout})} style={{cursor: 'pointer', width: 'calc(100%/6)', backgroundColor: this.state.knockout === knockout ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{knockout.toUpperCase()}</b>
            </div>)}
        </div>
        }

        {this.state.stages === 'group' && this.state.group !== 'all' && !!this.props.matches &&
        <table style={{width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', marginBottom: '12px', borderRadius: '8px', paddingTop: '8px'}}>
          <thead>
            <tr>
              <th>Pos</th>
              <th />
              <th>P</th>
              {/* <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th> */}
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </thead>
          <tbody>
            {groupTable.map((team, index) =>
        <tr key={team.name}>
          <td style={{textAlign: 'center', width: '12%'}}>{index + 1}</td>
          <td style={{display: 'flex', alignItems: 'center', padding: '4px 0'}}>
            <img src={team.flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={team.name} />
            <b>{team.name}</b>
          </td>
          <td style={{textAlign: 'center', width: '12%'}}>{team.played}</td>
          {/* <td style={{textAlign: 'center', width: '8%'}}>{team.won}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.drawn}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.lost}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.goalsFor}</td>
          <td style={{textAlign: 'center', width: '8%'}}>{team.goalsAgainst}</td> */}
          <td style={{textAlign: 'center', width: '12%'}}>{team.goalsFor - team.goalsAgainst}</td>
          <td style={{textAlign: 'center', width: '12%'}}>{team.won * 3 + team.drawn}</td>
        </tr>)}
        </tbody>
      </table>
      }



        {!!this.props.matches &&
          filteredMatches
          .sort((a,b) => a.name - b.name)
      .map(match =>
        <Match
          key={match.name}
          match={match}
          teams={this.props.teams}
          isAdmin={this.props.number === '+6587427184' || this.props.number === '+6594517971'}
          database={this.props.database} />
      )}</div>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  teams: PropTypes.arrayOf(PropTypes.object),
  number: PropTypes.string,
  database: PropTypes.object.isRequired
}

export default Matches
