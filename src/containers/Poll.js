import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.chooseOption = this.chooseOption.bind(this)
  }

  chooseOption(index){
    if(new Date(this.props.poll.date) < Date.now()) { return }
    let update = {}
    update[this.props.number] = {
      answer: index,
      answered: true
    }
    this.props.database.ref('/polls/' + this.props.poll.id + '/users').update(update)
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
    const { poll, users, teams, number } = this.props

    return (
      <div>
        {number &&
            <div style={{border: '1px solid grey', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px'}}>
              <div style={{textAlign: 'center', backgroundColor: '#ccdae5'}}>Poll {poll.index}</div>
              <h2 style={{textAlign: 'center'}}>{poll.title}</h2>
              <div style={{display: 'flex', padding: '12px', alignItems: 'flex-start', cursor: 'pointer'}}>
              {poll.options.map(opt =>
                <div
                  key={opt.option}
                  onClick={() => this.chooseOption(opt.index)}
                  style={{width: `calc(100%/${poll.options.length})`, display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: poll.users[number].answer === opt.index ? 'gold' : '', borderRadius: '12px', padding: '12px'}}>
                  <img src={teams[opt.option].flag} style={{width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '1px solid grey'}} alt={teams[opt.option].name}/>
                  <b style={{textAlign: 'center', marginTop: '4px'}}>{teams[opt.option].name}</b>
                </div>)}
            </div>

            <h4 onClick={() => this.setState({expanded: !this.state.expanded})} style={{textAlign: 'center', backgroundColor: 'purple', color: 'white', padding: '8px', cursor: 'pointer'}}>{this.state.expanded ? 'Close' : 'Open'}</h4>

            {this.state.expanded &&
              <div>
              {Object.values(users)
                .sort((a,b) => this.sortAlphabetically(a.name, b.name))
                .map(user =>
              <div key={user.number} style={{display: 'flex', backgroundColor: user.number === number ? 'gold' : ''}}>
                <div style={{width: '50%', padding: '4px 0px', paddingLeft: '12px', display: 'flex', alignItems: 'center'}}><b>{user.name[0].toUpperCase().concat(user.name.slice(1))}</b></div>
                {poll.users[user.number].answered
                   // && <div>{JSON.stringify(teams[user.answer])}</div>
                  ? <div style={{width: '50%', padding: '4px 0px', display: 'flex', alignItems: 'center'}}><img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid grey', marginRight: '8px'}} alt={teams[poll.options[poll.users[user.number].answer].option].name}/>
                <b>{teams[poll.options[poll.users[user.number].answer].option].name}</b>
              </div>
                : <span />
              }
              </div>
            )}
            </div>
            }
          </div>
      }
    </div>
    )
  }
}

Poll.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.object,
  number: PropTypes.string,
  database: PropTypes.object.isRequired
}

export default Poll
