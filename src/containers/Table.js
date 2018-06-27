import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      file: null,
      showingRules: false
    }
    this.calculateTable = this.calculateTable.bind(this)
    this.upload = this.upload.bind(this)
  }

  calculateTable(){
    const { polls, users } = this.props
    if(!polls || !users) { return []}
    for(var u in users) {
      users[u].points = 0
    }

    Object.values(polls)
    .filter(poll => poll.finishedResult !== null)
    .filter(poll => !poll.isHidden)
    .forEach(poll => {
      for(var p in poll.users) {
        // console.log(p);
        if(poll.users[p].answered && poll.users[p].answer === poll.finalResult) {
          // console.log(users[p], poll.pointValue);
          users[p].points += parseInt(poll.pointValue, 10)
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

  upload(){
    this.props.storage.ref().child('images/' + this.props.number).put(this.state.file)
    .then(snap => {
      console.log(snap);
    })
    this.props.database.ref().child('users/' + this.props.number).update({image: true})
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
        {/* <input type='file' onChange={(e) => this.setState({file: e.target.files[0]})} />
        <button onClick={this.upload}>upload</button> */}
      {table.map((user, index) =>
        <div key={user.number} style={{width: '100%', maxWidth: '480px', margin: '0 auto', backgroundColor: this.state.expanded === user.number ? '#ccdae5' : '', cursor: 'pointer'}} onClick={() => this.setState({expanded: this.state.expanded === user.number ? null : user.number})}>
        <div style={{display: 'flex', width: '100%', backgroundColor: user.points === table[0].points && user.points> 0 ? 'gold' : '', justifyContent: 'center', alignItems: 'center', padding: '4px 8px'}}>
          <h2 style={{width: '15%', textAlign: 'center'}}>{index + 1}</h2>
          <h2 style={{width: '70%', display: 'flex', alignItems: 'center'}}>
            <img src={teams[user.finalWinner].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px', filter: teams[user.finalWinner].eliminated ? 'grayscale(100%)' : ''}} alt={user.finalWinner} />
            &nbsp;{user.name[0].toUpperCase().concat(user.name.slice(1))}
          </h2>
          <h2 style={{width: '15%', textAlign: 'center'}}>{user.points}</h2>
        </div>
        {this.state.expanded === user.number &&
          <div style={{backgroundColor: 'white', border: '1px solid #ccdae5', paddingBottom: '12px'}}>
            <div style={{marginTop: '12px', padding: '0 8px'}}><b>Group Stage</b></div>
            {Object.values(polls)
              .filter(poll => !poll.isHidden)
              .slice(0,8)
              .sort((a,b) => a.index - b.index)
              .map(poll =>
              <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px'}}>
                <span style={{width: '50%'}}>{poll.title}</span>
                {poll.users[user.number].answered &&
                  <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                  <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                  <b>{poll.options[poll.users[user.number].answer].option}</b>
                </div>
                }
                <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
              </div>)}

              <div style={{marginTop: '12px', padding: '0 8px'}}><b>Round of 16</b></div>
              {Object.values(polls)
                .filter(poll => !poll.isHidden)
                .slice(8,16)
                .sort((a,b) => a.index - b.index)
                .map(poll =>
                <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px'}}>
                  <span style={{width: '50%'}}>{poll.title}</span>
                  {poll.users[user.number].answered &&
                    <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                    <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                    <b>{poll.options[poll.users[user.number].answer].option}</b>
                  </div>
                  }
                  <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
                </div>)}

                {/* <div style={{marginTop: '12px', padding: '0 8px'}}><b>Quarterfinals</b></div>
                {Object.values(polls)
                .filter(poll => !poll.isHidden)
                  .slice(16,20)
                  .sort((a,b) => a.index - b.index)
                  .map(poll =>
                  <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px'}}>
                    <span style={{width: '50%'}}>{poll.title}</span>
                    {poll.users[user.number].answered &&
                      <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                      <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                      <b>{poll.options[poll.users[user.number].answer].option}</b>
                    </div>
                    }
                    <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
                  </div>)}

                  <div style={{marginTop: '12px', padding: '0 8px'}}><b>Semifinals</b></div>
                  {Object.values(polls)
                  .filter(poll => !poll.isHidden)
                    .slice(20,22)
                    .sort((a,b) => a.index - b.index)
                    .map(poll =>
                    <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px'}}>
                      <span style={{width: '50%'}}>{poll.title}</span>
                      {poll.users[user.number].answered &&
                        <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                        <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                        <b>{poll.options[poll.users[user.number].answer].option}</b>
                      </div>
                      }
                      <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
                    </div>)}

                    <div style={{marginTop: '12px', padding: '0 8px'}}><b>Final</b></div>
                    {Object.values(polls)
                    .filter(poll => !poll.isHidden)
                      .slice(22)
                      .sort((a,b) => a.index - b.index)
                      .map(poll =>
                      <div key={poll.index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px'}}>
                        <span style={{width: '50%'}}>{poll.title}</span>
                        {poll.users[user.number].answered &&
                          <div style={{width: '30%', display: 'flex', alignItems: 'center'}}>
                          <img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '4px'}} alt={poll.options[poll.users[user.number].answer].option} />
                          <b>{poll.options[poll.users[user.number].answer].option}</b>
                        </div>
                        }
                        <div style={{width: '15%', textAlign: 'center'}}>{typeof(poll.finalResult) !== 'undefined' ? (poll.finalResult === poll.users[user.number].answer ? poll.pointValue : 0) : ''}</div>
                      </div>)} */}
          </div>
          }
        </div>
      )}

      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto'}}>
      <h3 style={{textAlign: 'center', marginTop: '48px', cursor: 'pointer', backgroundColor: '#ccdae5', padding: '8px'}}>Rules</h3>
        <br />
      <b>Welcome to the 2018 FIFA World Cup Prediction Game!</b>
      <br /><br />

<b>What you can win</b>
<p>All participants put in $10 at the beginning, and the winner gets everything at the end (the prize money is split equally if there is a tie)</p>
<br />

<b>How to win</b>
<p>Finish with the most points</p>
<br />

<b>Getting points</b>
<p>Before each stage begins, predict who advances as the group leader (Group Stage only) or wins their knockout match. For each correct answer, you get points depending on which stage it is:</p>
<br />

<table style={{width: '100%'}}>
  <thead>
    <tr>
      <th style={{textAlign: 'left'}}>Stage</th>
      <th style={{textAlign: 'left'}}>Pt/game</th>
      <th style={{textAlign: 'left'}}>No. games</th>
      <th style={{textAlign: 'left'}}>Total pts</th>
    </tr>
  </thead>
<tbody>
<tr>
  <td>Group Stage</td>
  <td>1</td>
  <td>8 groups</td>
  <td>8</td>
</tr>
<tr>
  <td>Round of 16</td>
  <td>2</td>
  <td>8 games</td>
  <td>16</td>
</tr>
<tr>
  <td>Quarterfinals</td>
  <td>3</td>
  <td>4 games</td>
  <td>12</td>
</tr>
<tr>
  <td>Semifinals</td>
  <td>4</td>
  <td>2 games</td>
  <td>8</td>
</tr>
<tr>
  <td>Final</td>
  <td>5</td>
  <td>1 game</td>
  <td>5</td>
</tr>
</tbody>
</table>
<br />

<p>The best possible score is 49 pts</p>
<br />

<b>Predictions</b>
<p>Before the first match begins, you must submit your predictions for the group stage. For subsequent stages, you must predict the winner of each match before the match begins. You are allowed to change your prediction as many times as you like before the match begins.</p>
<br />

<p>That’s it! Let’s have a great tournament!</p>
  </div>
  </div>
    )
  }
}

Table.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object)
}

export default Table
