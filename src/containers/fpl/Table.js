import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortAlphabetically } from '../../utilities/format'
import styled from 'styled-components'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.compareResultAndPrediction = this.compareResultAndPrediction.bind(this)
  }
  compareResultAndPrediction(result, prediction) {
    switch (true) {
      case result.home === prediction.home && result.away === prediction.away:
        return 2
      case result.home - result.away > 0 &&
        prediction.home - prediction.away > 0:
      case result.home - result.away === 0 &&
        prediction.home - prediction.away === 0:
      case result.home - result.away < 0 &&
        prediction.home - prediction.away < 0:
        return 1
      default:
        return 0
    }
  }
  render() {
    const { motw, teams } = this.props
    const users = Object.values(this.props.users).reduce((obj, u) => {
      obj[u.number] = { ...u, points: 0 }
      return obj
    }, {})
    const table = Object.values(motw).reduce((obj, m) => {
      // if (
      //   typeof m.homeResult !== undefined &&
      //   typeof m.awayResult !== undefined
      // ) {
      for (var user in m.users) {
        obj[user].points =
          obj[user].points +
          this.compareResultAndPrediction(
            { home: m.homeResult, away: m.awayResult },
            m.users[user]
          )
      }
      // }
      return obj
    }, users)
    return (
      <div>
        <h2>Table</h2>
        <div>
          {Object.values(table)
            .sort(
              (a, b) =>
                b.points - a.points || sortAlphabetically(a.name, b.name)
            )
            .map(u => (
              <div key={u.number}>
                <b>{u.name}</b>
                <span>{u.points}</span>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  motw: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired
}

export default Table
