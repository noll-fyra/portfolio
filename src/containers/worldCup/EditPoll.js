import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Poll from './Poll'
// import { Link } from 'react-router-dom'

class EditPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'active'
    }
  }

  render() {
    const { polls, users, number, database } = this.props
    const teams = this.props.teams ? this.props.teams.reduce((obj, team) => {
      obj[team.name] = team
      return obj
    },{}) : {}

    const filteredPolls = !!polls
    ? Object.keys(polls)
    .filter(poll => (this.state.view === 'active' && !poll.finalResult) || (this.state.view === 'completed' && !!poll.finalResult))
    : []

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', margin: '0 auto', border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
          {['active', 'completed'].map(view =>
            <div key={view} onClick={() => this.setState({view: view})} style={{cursor: 'pointer', width: '50%', backgroundColor: this.state.view === view ? '#ccdae5' : '', textAlign: 'center', padding: '8px 0'}}>
              <b>{view[0].toUpperCase().concat(view.slice(1))}</b>
            </div>)}
        </div>

        {!!polls && number &&
          filteredPolls
          .map(key => Object.assign({}, polls[key], {id: key}))
          .map(poll =>
            <Poll key={poll.id} poll={poll} users={users} teams={teams} number={number} database={database} />
        )
      }

      {this.state.view === 'completed' && filteredPolls.length === 0 &&
        <div style={{width: '100%', maxWidth: '480px', margin: '0 auto', textAlign: 'center'}}>Completed polls will appear here</div>}
    </div>
    )
  }
}

EditPoll.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object),
  number: PropTypes.string,
  database: PropTypes.object.isRequired
}

export default EditPoll
