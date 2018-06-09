import React, { Component } from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import Table from './Table'
import Polls from './Polls'
// import Poll from './Poll'
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
const ui = new firebaseui.auth.AuthUI(firebase.auth())

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      number: null
    }

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
          firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
    }
  }

  componentDidMount(){
    database.ref('/').on('value', snap => {
      this.setState({data: snap.val()})
    // let update = {}
    // let polls = Object.assign({}, snap.val().polls)
    // for(var key in polls) {
    //   let poll = polls[key]
    //   let users = Object.assign({}, poll.users)
    //   let temp = {}
    //   for(var userKey in users) {
    //     temp[userKey.split('-').join('')] = users[userKey]
    //   }
    //   poll.users = temp
    //   polls[key] = poll
    // }
    // database.ref('/polls').set(polls)
    })

    // window.localStorage.removeItem('number')

let number = window.localStorage.getItem('number')
    this.setState({
      number: window.localStorage.getItem('number')
    })

    if(!number) {
      ui.start('#firebaseui-auth-container', this.uiConfig)
    }
  }

  render() {
    return (
      <div>
      {this.state.number ?
<Router>
  <div>
    <h1 style={{textAlign: 'center'}}>2018 FIFA WORLD CUP PREDICTION GAME</h1>
  <Route path='/' render={() => <div style={{backgroundColor: '#19364C'}}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '480px', margin: '12px auto'}}>
          {['table', 'polls', 'newpoll', 'matches', 'teams'].map(sect =>
            <NavLink key={sect} to={`/${sect}`} activeStyle={{backgroundColor: 'white', color: '#19364C'}} style={{width: '25%', textAlign: 'center', color: 'white', textDecoration: 'none', padding: '8px'}}>
              {sect[0].toUpperCase().concat(sect.slice(1))}
            </NavLink>)}
            </div>
            </div>}/>

            {/* <h1 style={{maxWidth: '480px', margin: '0 auto'}}>{this.state.name ? `Hello, ${this.state.name[0].toUpperCase().concat(this.state.name.slice(1))}` : <Link to='/login'>Log in to continue</Link>}</h1> */}

{/* <div onClick={this.trySignIn}>click me to sign in</div> */}
{/* <div id={'sign-in-button'}/> */}
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/table' />} />
            <Route path='/table' render={() => <Table polls={this.state.data.polls} users={this.state.data.users} />} />
            <Route path='/polls' render={() => <Polls polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} number={this.state.number} />} />
            {/* <Route path='/polls/:id' render={(props) => <Poll polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} number={this.state.number} {...props} />} /> */}
            <Route path='/newpoll' render={() => this.state.number === '+65-87427184' ? <NewPoll polls={this.state.data.polls} users={this.state.data.users} teams={this.state.data.teams} database={database} /> : <Redirect to='/polls' />} />
            <Route path='/matches' render={() => <Matches matches={this.state.data.matches}/>} />
            <Route path='/teams' render={() => <Teams teams={this.state.data.teams} />} />
          </Switch>
          </div>
        </Router>
        : <div id={'firebaseui-auth-container'}/>}
        </div>
    )
  }
}

export default Root
