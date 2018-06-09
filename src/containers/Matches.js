import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Matches extends Component {
  render() {
    return (
      <div>
        {!!this.props.matches &&
          this.props.matches
      .sort((a,b) => a.name - b.name)
      .map((match, index) =>
        <div key={match.name} style={{width: '100%', maxWidth: '480px', margin: '0 auto', marginBottom: '12px', border: '1px solid grey', borderRadius: '12px', overflow: 'hidden'}}>
          <div style={{backgroundColor: '#ccdae5', textAlign: 'center'}}>Match {match.name}</div>
        <div style={{with: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px'}}>
          {match.home_team.name
            ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
            <img src={match.home_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid grey', objectFit: 'cover'}} alt={match.home_team.name} />
            <b>{match.home_team.name}</b>
          </div>
          : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'grey', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>?</div>
          <b>TBD</b>
        </div>
        }

          <div style={{width: '40%'}}>
            <div style={{textAlign: 'center'}}>{index <= 47 ? `Group ${match.group.toUpperCase()}` : index <= 55 ? 'Round of 16' : index <= 59 ? 'Quarterfinals' : index <= 61 ? 'Semifinals' : index === 62 ? 'Third Place Playoff' : 'Finals'}</div>
            <div style={{display: 'flex', justifyContent: 'space-around', margin: '8px 0'}}>
              <div style={{fontSize: '2.5em'}}>{match.home_result}</div>
              <div style={{fontSize: '2.5em'}}>{match.away_result}</div>
            </div>
            <div style={{textAlign: 'center', color: 'grey'}}>{new Date(match.date).getDate()} {new Date(match.date).getMonth() === 5 ? 'June' : 'July'} {new Date(match.date).getHours() > 12 ? new Date(match.date).getHours() - 12 : new Date(match.date).getHours()} {new Date(match.date).getHours() < 12 ? 'am' : 'pm'}</div>
          </div>

          {match.away_team.name
            ? <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
            <img src={match.away_team.flag} style={{width: '64px', height: '64px', borderRadius: '50%', border: '1px solid grey', objectFit: 'cover'}} alt={match.away_team.name} />
            <b>{match.away_team.name}</b>
          </div>
          : <div style={{display: 'flex', flexFlow: 'column', width: '30%', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'grey', fontSize: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>?</div>
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
