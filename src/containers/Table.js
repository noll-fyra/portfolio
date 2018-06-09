import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {}
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

    return (
      <div style={{paddingBottom: '12px'}}>
      {table.map((user, index) =>
        <div key={user.number} style={{display: 'flex', width: '100%', maxWidth: '480px', margin: '0 auto', backgroundColor: user.points === table[0].points && user.points> 0 ? 'gold' : '', justifyContent: 'center', alignItems: 'center', padding: '4px 0'}}>
          <h2 style={{width: '15%', textAlign: 'center'}}>{index + 1}</h2>
          <h2 style={{width: '70%'}}>{user.name[0].toUpperCase().concat(user.name.slice(1))}</h2>
          <h2 style={{width: '15%', textAlign: 'center'}}>{user.points}</h2>
        </div>
      )}
    </div>
    )
  }
}

Table.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object
}

export default Table
