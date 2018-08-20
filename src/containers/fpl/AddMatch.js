import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeFilter: '',
      home: '',
      awayFilter: '',
      away: '',
      gameWeek: props.motw.length + 1,
      year: new Date(Date.now()).getFullYear(),
      month: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getMonth() + 1,
      day: 0,
      hour: 0,
      minutes: 0
    }
    this.addMatch = this.addMatch.bind(this)
  }

  addMatch() {
    if (
      !this.state.home ||
      !this.state.away ||
      !this.state.month ||
      !this.state.day
    )
      return
    this.props.database.ref(`/fpl/1819/motw/`).push({
      gameWeek: this.state.gameWeek,
      homeTeam: this.state.home,
      awayTeam: this.state.away,
      date: `${this.state.year}-${this.padTime(
        this.state.month
      )}-${this.padTime(parseInt(this.state.day, 10))}T${this.padTime(
        parseInt(this.state.hour, 10)
      )}:${this.padTime(parseInt(this.state.minutes, 10))}:00+08:00`,
      users: Object.keys(this.props.users).reduce((obj, key) => {
        obj[key] = { home: 2, away: 0 }
        return obj
      }, {})
    })

    this.setState({
      homeFilter: '',
      home: '',
      awayFilter: '',
      away: '',
      gameWeek: this.props.motw.length + 2
    })
  }

  padTime(time) {
    return time < 10 ? `0${time}` : time
  }

  render() {
    const { teams, motw } = this.props

    return (
      <div
        style={{
          margin: `0 12px`,
          border: `1px solid lightGrey`,
          borderRadius: '8px'
        }}>
        <div
          style={{
            textAlign: 'center',
            borderBottom: `1px solid lightGrey`,
            padding: '4px',
            fontWeight: 'bold'
          }}>
          Add GW{motw.length + 1} Match
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
          <div
            style={{
              width: '50%',
              flexFlow: 'column',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <h3 style={{ textAlign: 'center' }}>Home</h3>
            {this.state.home ? (
              <div
                onClick={() => this.setState({ home: '' })}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <img
                  src={teams[this.state.home].logo}
                  alt={teams[this.state.home].name}
                  style={{
                    width: '88px',
                    height: '88px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center'
                }}>
                <input
                  style={{
                    width: '90%',
                    fontSize: '1em',
                    border: `1px solid lightGrey`,
                    margin: '0 auto',
                    padding: '8px'
                  }}
                  type="text"
                  placeholder="Filter home team"
                  value={this.state.homeFilter}
                  onChange={e => this.setState({ homeFilter: e.target.value })}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                  {Object.values(teams)
                    .filter(
                      t =>
                        t.name
                          .toLowerCase()
                          .includes(this.state.homeFilter.toLowerCase()) ||
                        t.code
                          .toLowerCase()
                          .includes(this.state.homeFilter.toLowerCase())
                    )
                    .map(t => (
                      <div
                        key={t.name}
                        onClick={() => this.setState({ home: t.name })}
                        style={{
                          width: '25%',
                          textAlign: 'center',
                          marginTop: '8px',
                          cursor: 'pointer'
                        }}>
                        <img
                          src={t.logo}
                          alt={t.name}
                          style={{
                            width: '36px',
                            height: '36px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              width: '50%',
              flexFlow: 'column',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <h3 style={{ textAlign: 'center' }}>Away</h3>
            {this.state.away ? (
              <div
                onClick={() => this.setState({ away: '' })}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <img
                  src={teams[this.state.away].logo}
                  alt={teams[this.state.away].name}
                  style={{
                    width: '88px',
                    height: '88px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'center'
                }}>
                <input
                  style={{
                    width: '90%',
                    fontSize: '1em',
                    border: `1px solid lightGrey`,
                    margin: '0 auto',
                    padding: '8px'
                  }}
                  type="text"
                  placeholder="Filter away team"
                  value={this.state.awayFilter}
                  onChange={e => this.setState({ awayFilter: e.target.value })}
                />

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                  {Object.values(teams)
                    .filter(
                      t =>
                        t.name
                          .toLowerCase()
                          .includes(this.state.awayFilter.toLowerCase()) ||
                        t.code
                          .toLowerCase()
                          .includes(this.state.awayFilter.toLowerCase())
                    )
                    .map(t => (
                      <div
                        key={t.name}
                        onClick={() => this.setState({ away: t.name })}
                        style={{
                          width: '25%',
                          textAlign: 'center',
                          marginTop: '8px',
                          cursor: 'pointer'
                        }}>
                        <img
                          src={t.logo}
                          alt={t.name}
                          style={{
                            width: '36px',
                            height: '36px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <br />

        <table style={{ maxWidth: '100%' }}>
          <thead>
            <tr style={{ width: '100%' }}>
              <th style={{ width: '20%' }}>Year</th>
              <th style={{ width: '20%' }}>Month</th>
              <th style={{ width: '20%' }}>Day</th>
              <th style={{ width: '20%' }}>Hour</th>
              <th style={{ width: '20%' }}>Minutes</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ width: '100%' }}>
              <td style={{ width: '20%' }}>
                <input
                  style={{ width: '100%', textAlign: 'center' }}
                  type="text"
                  value={this.state.year}
                  onChange={e => this.setState({ year: e.target.value })}
                />
              </td>
              <td style={{ width: '20%' }}>
                <input
                  style={{ width: '100%', textAlign: 'center' }}
                  type="text"
                  value={this.state.month}
                  onChange={e => this.setState({ month: e.target.value })}
                />
              </td>
              <td style={{ width: '20%' }}>
                <input
                  style={{ width: '100%', textAlign: 'center' }}
                  type="text"
                  value={this.state.day}
                  onChange={e => this.setState({ day: e.target.value })}
                />
              </td>
              <td style={{ width: '20%' }}>
                <input
                  style={{ width: '100%', textAlign: 'center' }}
                  type="text"
                  value={this.state.hour}
                  onChange={e => this.setState({ hour: e.target.value })}
                />
              </td>
              <td style={{ width: '20%' }}>
                <input
                  style={{ width: '100%', textAlign: 'center' }}
                  type="text"
                  value={this.state.minutes}
                  onChange={e => this.setState({ minutes: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <div
          onClick={this.addMatch}
          style={{
            cursor: 'pointer',
            backgroundColor: 'red',
            textAlign: 'center',
            padding: '4px'
          }}>
          <b style={{ color: 'white' }}>Add Match</b>
        </div>
      </div>
    )
  }
}

export default AddMatch

AddMatch.propTypes = {
  teams: PropTypes.object.isRequired,
  motw: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired
}
