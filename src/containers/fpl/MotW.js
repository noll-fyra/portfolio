import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrentMatch from './CurrentMatch'
import Result from './Result'
import { sortAlphabetically } from '../../utilities/format'
// import styled from 'styled-components'

class MotW extends Component {
  constructor(props) {
    super(props)
    this.state = {
      home: 0,
      away: 0
    }
    this.updateScore = this.updateScore.bind(this)
  }

  componentDidMount() {
    // let data
    // this.props.database.ref('/fpl/1819/users').once('value', snap => {
    //   //   // data = snap.val()
    //   //   console.log(snap.val())
    // this.props.database.ref('/fpl/1819/motw').push({
    //   homeTeam: { name: 'Derby County' },
    //   awayTeam: { name: 'Liverpool' },
    //   gameWeek: 1,
    //   users: Object.keys(this.props.users).reduce((obj, key) => {
    //     obj[key] = { home: 2, away: 0 }
    //     return obj
    //   }, {})
    // })
    // })
  }

  updateScore({ match, type, number, teams }) {
    let parsed = parseInt(number, 10)
    if (isNaN(parsed) || !Number.isInteger(parsed)) return
    if (!Object.keys(this.props.users).includes(this.props.number)) return
    if (!!match && !!type && parsed > -1 && parsed < 10) {
      this.props.database
        .ref(`/fpl/1819/motw/${match}/users/${this.props.number}`)
        .update({ [type]: parsed })
    }
  }

  render() {
    const { teams, number } = this.props
    const motw = Object.keys(this.props.motw).map(m => ({
      ...this.props.motw[m],
      key: m
    }))
    const users = Object.values(this.props.users).sort((a, b) =>
      sortAlphabetically(a.name, b.name)
    )
    const currentMatch = motw
      .filter(m => !m.homeResult || !m.awayResult)
      .filter(m => Date.now() - 2 * 60 * 60 * 1000 <= new Date(m.date))

    const results = motw
      .filter(
        m =>
          typeof m.homeResult !== 'undefined' &&
          typeof m.awayResult !== 'undefined'
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    return (
      <div>
        <h2 style={{ textAlign: 'center', padding: '12px' }}>
          Match of the Week
        </h2>

        <br />

        {currentMatch.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <b>The Match of the Week will appear here</b>
          </div>
        ) : (
          currentMatch.map(m => (
            <CurrentMatch
              key={m.key}
              match={m}
              users={users}
              teams={teams}
              number={number}
              updateScore={this.updateScore}
            />
          ))
        )}

        <br />

        <h2 style={{ textAlign: 'center', padding: '12px' }}>Results</h2>

        <br />

        {results.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <b>Results will appear here</b>
          </div>
        ) : (
          <div
            style={{
              border: `1px solid lightGrey`,
              margin: `12px`,
              marginTop: 0
            }}>
            {results.map(m => (
              <Result key={m.key} match={m} users={users} teams={teams} />
            ))}
          </div>
        )}
      </div>
    )
  }
}

MotW.propTypes = {
  motw: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired
}

export default MotW
