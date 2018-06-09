import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Poll from './Poll'
// import { Link } from 'react-router-dom'

class Polls extends Component {

  render() {
    const { polls, users, number, database } = this.props
    const teams = this.props.teams ? this.props.teams.reduce((obj, team) => {
      obj[team.name] = team
      return obj
    },{}) : {}

    return (
      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto'}}>
        {!!polls && number &&
          Object.keys(polls)
          .map(key => Object.assign({}, polls[key], {id: key}))
          .map(poll =>
            <Poll key={poll.id} poll={poll} users={users} teams={teams} number={number} database={database} />
        )
      }
    </div>
    )
  }
}

Polls.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object),
  number: PropTypes.string,
  database: PropTypes.object.isRequired
}

export default Polls
