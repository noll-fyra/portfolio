import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CurrentMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: props.match.users[props.number].home,
      away: props.match.users[props.number].away,
      countdown: [0, 0, 0]
    }
    this.pollInterval = null
    this.updateScore = this.updateScore.bind(this)
    this.countdown = this.countdown.bind(this)
  }

  componentDidMount() {
    this.countdown(this.props.match.date)
  }

  componentWillUnmount() {
    window.clearInterval(this.pollInterval)
  }

  updateScore({ type, number }) {
    this.setState({ [type]: number })
    if (Date.now() < new Date(this.props.match.date)) {
      this.props.updateScore({ match: this.props.match.key, type, number })
    }
  }

  countdown(date) {
    if (!date) return
    this.pollInterval = window.setInterval(() => {
      let difference = new Date(this.props.match.date) - Date.now()
      if (difference < 0) return

      let hours = Math.floor(difference / 1000 / 60 / 60)
      let minutes =
        hours === 0
          ? Math.floor(difference / 1000 / 60)
          : Math.floor((difference / 1000 / 60) % (hours * 60))
      let seconds =
        hours * 60 * 60 + minutes * 60 === 0
          ? Math.floor(difference / 1000)
          : Math.floor((difference / 1000) % (hours * 60 * 60 + minutes * 60))
      this.setState({
        countdown: [hours, minutes, seconds]
      })
    }, 1000)
  }

  padTime(time) {
    return time < 10 ? `0${time}` : time
  }

  render() {
    const { match, users, teams } = this.props
    return (
      <div
        style={{
          margin: '0 12px',
          border: `1px solid lightGrey`,
          borderRadius: '8px'
        }}>
        <div
          style={{
            textAlign: 'center',
            borderBottom: `1px solid lightGrey`,
            padding: '4px'
          }}>
          <i className="fa fa-clock-o" />&nbsp;
          <span>
            {this.state.countdown[0]}:{this.padTime(this.state.countdown[1])}:{this.padTime(
              this.state.countdown[2]
            )}
          </span>
        </div>

        <div style={{ padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'center', width: '35%' }}>
              {teams[match.homeTeam].code}
            </h2>
            <h3 style={{ textAlign: 'center', width: '30%' }}>
              GW {match.gameWeek}
            </h3>
            <h2 style={{ textAlign: 'center', width: '35%' }}>
              {teams[match.awayTeam].code}
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '4px'
            }}>
            <div style={{ width: '35%', textAlign: 'center' }}>
              <img
                src={teams[match.homeTeam].logo}
                alt={teams[match.homeTeam].name}
                style={{ width: '88px', height: '88px', objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '30%',
                justifyContent: 'space-around'
              }}>
              <input
                type="number"
                value={this.state.home}
                onChange={e =>
                  this.updateScore({ type: 'home', number: e.target.value })
                }
                style={{
                  border: '1px solid lightGrey',
                  width: '48px',
                  height: '48px',
                  fontSize: '2em'
                }}
              />
              <input
                type="number"
                value={this.state.away}
                onChange={e =>
                  this.updateScore({ type: 'away', number: e.target.value })
                }
                style={{
                  border: '1px solid lightGrey',
                  width: '48px',
                  height: '48px',
                  fontSize: '2em'
                }}
              />
            </div>
            <div style={{ width: '35%', textAlign: 'center' }}>
              <img
                src={teams[match.awayTeam].logo}
                alt={teams[match.awayTeam].name}
                style={{ width: '88px', height: '88px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {users.map((u, index) => (
          <div
            key={u.number}
            style={{
              width: '100%',
              display: 'flex',
              backgroundColor: index % 2 ? '' : 'whiteSmoke',
              padding: `4px 12px`
            }}>
            <b style={{ width: '35%' }}>
              {u.name[0].toUpperCase().concat(u.name.slice(1))}
            </b>
            <div style={{ width: '30%', textAlign: 'center' }}>
              {match.users[u.number].home} - {match.users[u.number].away}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

CurrentMatch.propTypes = {
  match: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  teams: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired,
  updateScore: PropTypes.func.isRequired
}

export default CurrentMatch
