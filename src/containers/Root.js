import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
// import * as firebaseui from 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Table from './Table'
import Polls from './Polls'
// import Poll from './Poll'
import NewPoll from './NewPoll'
import EditPoll from './EditPoll'
import Matches from './Matches'
import LogOut from './LogOut'

const config = {
  apiKey: 'AIzaSyDKr_16PAkbfQQWTp-xIo1-1_2YSdIxnOo',
  authDomain: 'portfolio-5919e.firebaseapp.com',
  databaseURL: 'https://portfolio-5919e.firebaseio.com',
  storageBucket: 'portfolio-5919e.appspot.com',
  messagingSenderId: '833655148390'
}

firebase.initializeApp(config)
const database = firebase.database()
// const ui = new firebaseui.auth.AuthUI(firebase.auth())

const sections = ['polls', 'table', 'matches']
const hidden = ['newpoll', 'editpoll']

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      number: null,
      hidden: true
    }
    this.removeNumber = this.removeNumber.bind(this)
    this.unregisterAuthObserver = null
    this.uiConfig = {
      callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            window.localStorage.setItem('number', authResult.user.phoneNumber)
            this.setState({number: authResult.user.phoneNumber})
            // console.log(authResult, redirectUrl, this.state);
            return false;
          }.bind(this),
          // uiShown: function() {
          //   // The widget is rendered.
          //   // Hide the loader.
          //   document.getElementById('loader').style.display = 'none';
          // }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        // signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          // firebase.auth.EmailAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'SG'
          }
        ],
    }
  }

  componentDidMount(){
    database.ref('/').on('value', snap => {
      this.setState({data: snap.val()})
    })

let number = window.localStorage.getItem('number')
this.setState({hidden: !!number})
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => {
          // console.log(user)
          if(!!user){
          this.setState({number: user.phoneNumber})
          window.localStorage.setItem('number', user.phoneNumber)
        }
        }
    )

  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  removeNumber(){
    this.setState({number: null, hidden: false})
  }

  render() {
    return (
      <div>
      {this.state.number ?
      !!this.state.data.users && Object.keys(this.state.data.users).includes(this.state.number)
 ? <Router>
  <div>
    <h1 style={{textAlign: 'center', marginTop: '12px'}}>2018 FIFA WORLD CUP PREDICTION GAME</h1>
  <Route path='/' render={() => <div style={{backgroundColor: '#19364C'}}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '480px', margin: '12px auto'}}>
          {sections.map(sect =>
            <NavLink key={sect} to={`/${sect}`} activeStyle={{backgroundColor: 'gold', color: '#19364C'}} style={{width: `calc(100%/${sections.length})`, maxWidth: `calc(480px/${sections.length})`, fontWeight: 'bold', textAlign: 'center', color: 'white', textDecoration: 'none', padding: '8px'}}>
              {sect[0].toUpperCase().concat(sect.slice(1))}
            </NavLink>)}
            </div>

            {this.state.number === '+6587427184' &&
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '480px', margin: '12px auto'}}>
            {hidden.map(sect =>
              <NavLink key={sect} to={`/${sect}`} activeStyle={{backgroundColor: 'gold', color: '#19364C'}} style={{width: `calc(100%/${hidden.length})`, maxWidth: `calc(480px/${hidden.length})`, fontWeight: 'bold', textAlign: 'center', color: 'white', textDecoration: 'none', padding: '8px'}}>
                {sect[0].toUpperCase().concat(sect.slice(1))}
              </NavLink>)}
              </div>}
            </div>}/>

<div style={{padding: 12}}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/polls' />} />
            <Route path='/polls' render={() => <Polls polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} number={this.state.number} />} />
            <Route path='/newpoll' render={() => <NewPoll polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} />} />
            <Route path='/editpoll' render={() => <EditPoll polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} number={this.state.number} />} />
            <Route path='/table' render={() => <Table polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} storage={firebase.storage()} number={this.state.number} />} />
            <Route path='/matches' render={() => <Matches matches={this.state.data.matches} teams={this.state.data.teams} database={database} number={this.state.number} />} />
            <Route path='/logout' render={() => <LogOut auth={firebase.auth()} removeNumber={this.logOut} />} />
          </Switch>
          </div>
          </div>
        </Router>
        : <div style={{width: '100vw', height: '100vh', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <i className='fa fa-futbol-o fa-spin' style={{fontSize: '2em'}}/>
          <h1>Loading</h1>
        </div>
        : <div style={{width: this.state.hidden ? '0' : '100%'}}>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
      }
        </div>
    )
  }
}

export default Root
