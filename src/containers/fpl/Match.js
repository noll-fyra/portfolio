import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Match extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: props.match.users[props.number].home,
      away: props.match.users[props.number].away
    }
    this.updateScore = this.updateScore.bind(this)
  }

  updateScore({ type, number }) {
    this.setState({ [type]: number })
    this.props.updateScore({ match: this.props.match.key, type, number })
  }

  render() {
    const { match, users, teams } = this.props
    return (
      <div key={match.key}>
        <h3>GW {match.gameWeek}</h3>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <b>{teams[match.homeTeam].name}</b>
          <img
            src={teams[match.homeTeam].logo}
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
          <input
            type="number"
            value={this.state.home}
            onChange={e =>
              this.updateScore({ type: 'home', number: e.target.value })
            }
            style={{
              border: '1px solid grey',
              width: '48px',
              fontSize: '1.5em'
            }}
          />
          <input
            type="number"
            value={this.state.away}
            onChange={e =>
              this.updateScore({ type: 'away', number: e.target.value })
            }
            style={{
              border: '1px solid grey',
              width: '48px',
              fontSize: '1.5em'
            }}
          />
          <b>{teams[match.awayTeam].name}</b>
          <img
            src={teams[match.awayTeam].logo}
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
        </div>

        <div>
          {users.map(u => (
            <div key={u.number}>
              <b>{u.name[0].toUpperCase().concat(u.name.slice(1))}</b>&nbsp;{
                match.users[u.number].home
              }{' '}
              - {match.users[u.number].away}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Match.propTypes = {
  match: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  teams: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired
}

export default Match
