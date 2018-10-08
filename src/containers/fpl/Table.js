import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sortAlphabetically } from '../../utilities/format'
// import styled from 'styled-components'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

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

  calculateAmountEarned(table, index) {
    let rankObject = Object.values(table).reduce((obj, u) => {
      obj[u.points] = (obj[u.points] || 0) + 1
      return obj
    }, {})
    let rankCount = Object.keys(rankObject)
      .map((o, i) => ({ value: o, index: i }))
      .sort((a, b) => b.value - a.value)
      .map(m => Object.values(rankObject)[m.index])

    if (index === 0) {
      switch (rankCount[0]) {
        case 1:
          return 50
        case 2:
          return (50 + 20) / 2
        default:
          return (50 + 20 + 10) / rankCount[0]
      }
    } else if (index === 1) {
      switch (true) {
        case rankCount[0] === 1 && rankCount[1] === 1:
          return 20
        case rankCount[0] === 2:
          return (50 + 20) / 2
        case rankCount[0] > 2:
          return (50 + 20 + 10) / rankCount[0]
        default:
          return (20 + 10) / rankCount[1]
      }
    } else if (index === 2) {
      switch (true) {
        case rankCount[0] === 1 && rankCount[1] === 1 && rankCount[2] === 1:
        case rankCount[0] === 2 && rankCount[1] === 1:
          return 10
        case rankCount[0] === 1 && rankCount[1] === 2:
          return (20 + 10) / 2
        case rankCount[0] > 2:
          return (50 + 20 + 10) / rankCount[0]
        default:
          return 0
      }
    } else {
      return 0
    }
  }

  calculateCashEarned(array, index) {
    let earned = 0
    array.forEach((num, i) => {
      let difference = array[index].total - array[i].total
      earned += difference / 100
    })
    return earned
  }

  render() {
    const {
      motw,
      fplData
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
        <h2 style={{ textAlign: 'center', padding: '12px' }}>MotW Table</h2>

        <br />

        <div
          style={{
            margin: '0 12px',
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
                    {this.calculateAmountEarned(table, index)}
                    {/* {index === 0
                      ? '$50'
                      : index === 1
                        ? '$20'
                        : index === 2
                          ? '$10'
                          : ''} */}
                  </h3>
                </div>
              </div>
            ))}
        </div>
        <br />
        <br />
        <br />
        <h2 style={{ textAlign: 'center', padding: '12px' }}>FPL Table</h2>
        <br />
        <div>
          {Object.keys(fplData).length > 0 && (
            <div
              style={{
                margin: '0 12px',
                border: `1px solid lightGrey`,
                borderRadius: '8px',
                padding: `12px 0`
              }}>
              {fplData.standings.results
                .sort((a, b) => a.rank - b.rank)
                .map((r, i) => (
                  <div
                    key={r.id}
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
                      <h3>{r.rank}</h3>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '55%'
                      }}>
                      <h3>
                        {Object.values(this.props.users)
                          .filter(u => u.team_id === r.id)[0]
                          .name[0].toUpperCase()
                          .concat(
                            Object.values(this.props.users)
                              .filter(u => u.team_id === r.id)[0]
                              .name.slice(1)
                          )}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '15%'
                      }}>
                      <h3>{r.total}</h3>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '15%'
                      }}>
                      <h3>
                        {formatter.format(
                          this.calculateCashEarned(
                            fplData.standings.results.sort(
                              (a, b) => a.rank - b.rank
                            ),
                            i
                          )
                        )}
                      </h3>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  motw: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  teams: PropTypes.object.isRequired,
  fplData: PropTypes.object.isRequired
}

export default Table
