import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Match from './Match'
import { sortAlphabetically } from '../../utilities/format'
import styled from 'styled-components'

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

  updateScore({ match, type, number }) {
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
    const { number } = this.props
    const motw = Object.keys(this.props.motw).map(m => ({
      ...this.props.motw[m],
      key: m
    }))
    const users = Object.values(this.props.users).sort((a, b) =>
      sortAlphabetically(a.name, b.name)
    )
    return (
      <Container>
        <h2>Match of the Week</h2>
        <br />
        {motw
          .filter(m => !m.homeResult || !m.awayResult)
          .map(m => (
            <Match
              key={m.key}
              match={m}
              users={users}
              number={number}
              updateScore={this.updateScore}
            />
          ))}
      </Container>
    )
  }
}

MotW.propTypes = {
  motw: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired
}

export default MotW

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`
