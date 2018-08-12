import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortAlphabetically } from '../../utilities/format'
// import styled from 'styled-components'

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
    const {
      motw
      // teams
    } = this.props
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
        <h2 style={{ textAlign: 'center', padding: '12px' }}>Table</h2>

        <br />

        <div
          style={{
            margin: '12px',
            border: `1px solid lightGrey`,
            borderRadius: '8px',
            padding: `12px 0`
          }}>
          {Object.values(table)
            .sort(
              (a, b) =>
                b.points - a.points || sortAlphabetically(a.name, b.name)
            )
            .map((u, index) => (
              <div
                key={u.number}
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
                    width: '15%'
                  }}>
                  <h3>{index + 1}</h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '55%'
                  }}>
                  <h3>{u.name[0].toUpperCase().concat(u.name.slice(1))}</h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '15%'
                  }}>
                  <h3>{u.points}</h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '15%'
                  }}>
                  <h3>
                    {index === 0
                      ? '$50'
                      : index === 1
                        ? '$20'
                        : index === 2
                          ? '$10'
                          : ''}
                  </h3>
                </div>
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
