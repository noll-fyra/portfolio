import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeResult: props.match.homeResult,
      awayResult: props.match.awayResult,
      expanded: false
    }
  }
  render() {
    const { match, users, teams, number, updateResult } = this.props
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => this.setState({ expanded: !this.state.expanded })}>
        <div
          style={{
            display: 'flex',
            padding: '4px 12px',
            alignItems: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '7.5%'
            }}>
            <b>{match.gameWeek}</b>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '30%'
            }}>
            <b>{teams[match.homeTeam].code}</b>
            &nbsp;
            <img
              src={teams[match.homeTeam].logo}
              alt={teams[match.homeTeam].name}
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '25%'
            }}>
            {number === '+6587427184' || number === '+6597918284' ? (
              <input
                type="text"
                value={this.state.homeResult}
                style={{
                  width: '24px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1em'
                }}
                onChange={e => {
                  this.setState({ homeResult: e.target.value })
                  updateResult({
                    match: match.key,
                    type: 'homeResult',
                    number: e.target.value
                  })
                }}
              />
            ) : (
              <b>{match.homeResult}</b>
            )}

            <span>&nbsp;-&nbsp;</span>

            {number === '+6587427184' || number === '+6597918284' ? (
              <input
                type="text"
                value={this.state.awayResult}
                style={{
                  width: '24px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1em'
                }}
                onChange={e => {
                  this.setState({ awayResult: e.target.value })
                  updateResult({
                    match: match.key,
                    type: 'awayResult',
                    number: e.target.value
                  })
                }}
              />
            ) : (
              <b>{match.homeResult}</b>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '30%'
            }}>
            <img
              src={teams[match.awayTeam].logo}
              alt={teams[match.awayTeam].name}
              style={{ width: '36px', height: '36px', objectFit: 'contain' }}
            />
            &nbsp;
            <b>{teams[match.awayTeam].code}</b>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '7.5%'
            }}>
            <i
              className={`fa ${
                this.state.expanded ? 'fa-chevron-up' : 'fa-chevron-down'
              }`}
              style={{ color: 'lightGrey' }}
            />
          </div>
        </div>

        {this.state.expanded &&
          users.map((u, index) => (
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

Result.propTypes = {
  match: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  teams: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired,
  updateResult: PropTypes.func.isRequired
}

export default Result
