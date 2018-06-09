import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect, NavLink, Link } from 'react-router-dom'
import firebase from 'firebase'
import Table from './Table'
import Polls from './Polls'
import NewPoll from './NewPoll'
import Matches from './Matches'
import Teams from './Teams'

const config = {
  apiKey: 'AIzaSyDKr_16PAkbfQQWTp-xIo1-1_2YSdIxnOo',
  authDomain: 'portfolio-5919e.firebaseapp.com',
  databaseURL: 'https://portfolio-5919e.firebaseio.com',
  storageBucket: 'portfolio-5919e.appspot.com',
  messagingSenderId: '833655148390'
}

firebase.initializeApp(config)
const database = firebase.database()

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      view: 'matches',
      name: null
    }
  }

  componentDidMount(){
    database.ref('/').on('value', snap => {
      this.setState({data: snap.val()})
    })

    this.setState({
      name: window.localStorage.getItem('name'),
      number: window.localStorage.getItem('number')
    })
  }

  render() {
    return (
<Router>
  <div>
    <h1 style={{textAlign: 'center'}}>2018 FIFA WORLD CUP PREDICTION GAME</h1>
  <Route path='/' render={() => <div style={{backgroundColor: '#19364C'}}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '480px', margin: '12px auto'}}>
          {['table', 'polls', 'matches', 'teams'].map(sect =>
            <NavLink key={sect} to={`/${sect}`} activeStyle={{backgroundColor: 'white', color: '#19364C'}} style={{width: '25%', textAlign: 'center', color: 'white', textDecoration: 'none', padding: '8px'}}>
              {sect[0].toUpperCase().concat(sect.slice(1))}
            </NavLink>)}
            </div>
            </div>}/>

            <h1 style={{maxWidth: '480px', margin: '0 auto'}}>{this.state.name ? `Hello, ${this.state.name[0].toUpperCase().concat(this.state.name.slice(1))}` : <Link to='/login'>Log in to continue</Link>}</h1>

          <Switch>
            <Route exact path='/' render={() => <Redirect to='/table' />} />
            <Route path='/table' render={() => <Table polls={this.state.data.polls} users={this.state.data.users} />} />
            <Route exact path='/polls' render={() => <Polls polls={this.state.data.polls} />} />
            <Route path='/polls/new' render={() => this.state.number === '+65-87427184' ? <NewPoll polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} /> : <Redirect to='/polls' />} />
            <Route path='/matches' render={() => <Matches matches={this.state.data.matches}/>} />
            <Route path='/teams' render={() => <Teams teams={this.state.data.teams} />} />
          </Switch>
          </div>
        </Router>
    )
  }
}

export default Root
