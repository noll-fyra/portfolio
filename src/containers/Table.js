import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    }
    this.calculateTable = this.calculateTable.bind(this)
  }

  calculateTable(){
    const { polls, users } = this.props
    if(!polls || !users) { return []}
    for(var u in users) {
      users[u].points = 0
    }

    Object.values(polls).filter(poll => poll.finishedResult !== null).forEach(poll => {
      for(var p in poll.users) {
        // console.log(p);
        if(poll.users[p].answered && poll.users[p].answer === poll.finalResult) {
          // console.log(users[p], poll.pointValue);
          users[p].points += poll.pointValue
        }
      }
    })
    return Object.values(users).sort((a,b) => this.sortAlphabetically(a.name, b.name)).sort((a,b) => b.points - a.points)
  }

  sortAlphabetically(first, second) {
    switch(true) {
      case first > second:
        return 1
      case first < second:
        return -1
      default:
        return -1
    }
  }

  render() {
    const table = this.calculateTable()
    const { polls } = this.props
    const teams = this.props.teams ? this.props.teams.reduce((obj, team) => {
      obj[team.name] = team
      return obj
    },{}) : {}

    return (
      <div style={{paddingBottom: '12px'}}>
      {table.map((user, index) =>
        <div key={user.number} style={{width: '100%', maxWidth: '480px', margin: '0 auto', backgroundColor: this.state.expanded === user.number ? '#ccdae5' : '', cursor: 'pointer'}} onClick={() => this.setState({expanded: this.state.expanded === user.number ? null : user.number})}>
        <div style={{display: 'flex', width: '100%', backgroundColor: user.points === table[0].points && user.points> 0 ? 'gold' : '', justifyContent: 'center', alignItems: 'center', padding: '4px 0'}}>
          <h2 style={{width: '15%', textAlign: 'center'}}>{index + 1}</h2>
          <h2 style={{width: '70%'}}>{user.name[0].toUpperCase().concat(user.name.slice(1))}</h2>
          <h2 style={{width: '15%', textAlign: 'center'}}>{user.points}</h2>
        </div>
        {this.state.expanded === user.number &&
          <div style={{backgroundColor: 'white', padding: '8px', border: '1px solid #ccdae5'}}>
            {Object.values(polls)
              .sort((a,b) => a.index - b.index)
              .map(poll =>
              <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0'}}>
                <span style={{width: '50%'}}>{poll.title}</span>
                {poll.users[user.number].answered &&
                  <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                  <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                  <b>{poll.options[poll.users[user.number].answer].option}</b>
                </div>
                }
                <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
              </div>)}
          </div>
          }
        </div>
      )}
    </div>
    )
  }
}

Table.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.object
}

export default Table
