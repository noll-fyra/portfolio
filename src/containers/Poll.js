import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      countdown: null
    }
    this.pollInterval = null
    this.chooseOption = this.chooseOption.bind(this)
  }

  componentDidMount(){
    this.pollInterval = window.setInterval(() => {
      let difference = new Date(this.props.poll.date) - Date.now()
      if (difference < 0) { return }
      let hours = Math.floor(difference / 1000 / 60 / 60)
      let minutes = Math.floor(difference / 1000 / 60 % (hours * 60))
      let seconds = Math.floor(difference / 1000 % (hours * 60 * 60 + minutes * 60))
      this.setState({countdown: [hours, minutes < 10 ? `0${minutes}` : minutes, seconds < 10 ? `0${seconds}` : seconds]})
    }, 1000)
  }

  componentWillUnmount(){
    window.clearInterval(this.pollInterval)
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
      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto'}}>
        {number &&
            <div style={{border: '1px solid #ccdae5', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#ccdae5', padding: '4px 12px'}}>
                <span>Poll {poll.index}</span>
                {new Date(poll.date) > Date.now()
                  ? this.state.countdown && <div><i className='fa fa-clock-o' />&nbsp;{this.state.countdown[0]}:{this.state.countdown[1]}:{this.state.countdown[2]}</div>
                // ? <div>{new Date(poll.date).getDate()} {new Date(poll.date).getMonth() === 5 ? 'June' : 'July'} {new Date(poll.date).getHours() > 12 ? new Date(poll.date).getHours() - 12 : new Date(poll.date).getHours()} {new Date(poll.date).getHours() < 12 ? 'am' : 'pm'}</div>
                : <div><i className='fa fa-clock-o' />&nbsp;Completed</div>
              }</div>
              <h3 style={{textAlign: 'center', marginTop: '12px'}}>{poll.title}</h3>
              <div style={{display: 'flex', padding: '12px', alignItems: 'flex-start', cursor: 'pointer'}}>
              {poll.options.map(opt =>
                <div
                  key={opt.option}
                  onClick={() => this.chooseOption(opt.index)}
                  style={{width: `calc(100%/${poll.options.length})`, display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: poll.users[number].answer === opt.index ? 'gold' : '', borderRadius: '8px', padding: '12px', border: poll.finalResult === opt.index ? '4px solid #19364C' : ''}}>
                  <img src={teams[opt.option].flag} style={{width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5'}} alt={teams[opt.option].name}/>
                  <b style={{textAlign: 'center', marginTop: '4px'}}>{teams[opt.option].name}</b>
                </div>)}
            </div>


            <div onClick={() => this.setState({expanded: !this.state.expanded})} style={{textAlign: 'center', borderTop: '1px solid #ccdae5', backgroundColor: this.state.expanded ? '#ccdae5' : '', padding: '4px', cursor: 'pointer'}}><i className={this.state.expanded ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} /></div>

            {this.state.expanded &&
              <div style={{borderTop: '1px solid #ccdae5'}}>
              {Object.values(users)
                .sort((a,b) => this.sortAlphabetically(a.name, b.name))
                .map(user =>
              <div key={user.number} style={{display: 'flex', backgroundColor: user.number === number ? 'gold' : ''}}>
                <div style={{width: '50%', padding: '4px 0px', paddingLeft: '12px', display: 'flex', alignItems: 'center'}}><b>{user.name[0].toUpperCase().concat(user.name.slice(1))}</b></div>
                {poll.users[user.number].answered
                   // && <div>{JSON.stringify(teams[user.answer])}</div>
                  ? <div style={{width: '50%', padding: '4px 0px', display: 'flex', alignItems: 'center'}}><img src={teams[poll.options[poll.users[user.number].answer].option].flag} style={{width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccdae5', marginRight: '8px'}} alt={teams[poll.options[poll.users[user.number].answer].option].name}/>
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
