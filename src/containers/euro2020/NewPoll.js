import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NewPoll extends Component {
constructor(props) {
  super(props);
  this.state = {
    title: '',
    date: null,
    options: [],
    pointValue: 0,
    filter: ''
  }
  this.createPoll = this.createPoll.bind(this)
}

createPoll(){
  let poll = {
    title: this.state.title,
    date: new Date(this.state.date).toUTCString(),
    options: this.state.options.map((opt, index) => ({index: index, option: opt.name})),
    index: Object.keys(this.props.polls).length + 1,
    pointValue: parseInt(this.state.pointValue, 10),
    type: 'multiple_choice',
    users: Object.values(this.props.users).reduce((obj, user) => {
      obj[user.number] = {answered: false}
      return obj
    }, {})
  }

  this.props.database.ref().child('polls').push(poll)

  this.setState({
    title: '',
    date: null,
    options: [],
    pointValue: 0,
    filter: ''
  })
}

  render() {
    return (
      <div style={{width: '100%', maxWidth: '480px', margin: '0 auto', padding: '12px'}}>
        <b>Title</b>
        <input type='text' onChange={(e) => this.setState({title: e.target.value})} placeholder={'title'} style={{width: '100%', fontSize: '1em'}} />
        <h4>Date</h4>
        <input type='date' onChange={(e) => this.setState({date: e.target.value})} placeholder={'date'} style={{width: '100%', fontSize: '1em'}} />
        <h4>Point Value</h4>
        <input type='number' onChange={(e) => this.setState({pointValue: e.target.value})} placeholder={'point value'} value={this.state.pointValue} style={{width: '100%', fontSize: '1em'}} />
        <br />
        <span>Options</span>
        <input type='text' onChange={(e) => this.setState({filter: e.target.value})} placeholder={'filter teams'} value={this.state.filter} style={{width: '100%', fontSize: '1em'}} />

        <span>Chosen</span>
        <div style={{display: 'flex'}}>
          {this.state.options.map((team, index) =>
        <div key={team.index} onClick={() => this.setState({options: this.state.options.filter((team, ind) => index !== ind)})} style={{display: 'flex', alignItems: 'center', marginRight: '12px'}}>
          <img src={team.flag} style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid grey', marginRight: '8px'}} alt={team.name} />
          <b>{team.name}</b>
        </div>)}
        </div>

        <div style={{display: 'flex'}}>
        {!!this.props.teams && this.props.teams.filter(team => this.state.filter.length > 0 && team.name.toLowerCase().includes(this.state.filter.toLowerCase()) && !this.state.options.map(opt => opt.name).includes(team.name)).map(team =>
        <div key={team.index} onClick={() => this.setState({options: this.state.options.concat(team), filter: ''})} style={{display: 'flex', alignItems: 'center', marginRight: '12px'}}>
          <img src={team.flag} style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid grey', marginRight: '8px'}} alt={team.name} />
          <b>{team.name}</b>
        </div>)}
      </div>

        <button onClick={this.createPoll}>Create</button>
    </div>
    )
  }
}

NewPoll.propTypes = {
  polls: PropTypes.object,
  users: PropTypes.object,
  teams: PropTypes.arrayOf(PropTypes.object),
  database: PropTypes.object.isRequired
}

export default NewPoll
