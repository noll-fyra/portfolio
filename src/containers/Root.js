import React, { Component } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
// import axios from 'axios'
// import App from '../components/app/App'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Header from './euro2020/Header'
import Table from './euro2020/Table'
import Teams from './euro2020/Teams'
import NewPoll from './euro2020/NewPoll'
import Matches from './euro2020/Matches'
import OurStory from './ourstory/Index'
import LogOut from './LogOut'

const config = {
  apiKey: 'AIzaSyDKr_16PAkbfQQWTp-xIo1-1_2YSdIxnOo',
  authDomain: 'portfolio-5919e.firebaseapp.com',
  databaseURL: 'https://portfolio-5919e.firebaseio.com',
  storageBucket: 'portfolio-5919e.appspot.com',
  messagingSenderId: '833655148390',
}

firebase.initializeApp(config)
const database = firebase.database()

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      number: null,
      hidden: true,
      fplData: {},
    }
    this.removeNumber = this.removeNumber.bind(this)
    this.unregisterAuthObserver = null
    this.uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          window.localStorage.setItem('number', authResult.user.phoneNumber)
          this.setState({ number: authResult.user.phoneNumber })
          // console.log(authResult, redirectUrl, this.state);
          return false
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
          defaultCountry: 'SG',
        },
      ],
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    database.ref('/').on('value', (snapshot) => {
      this.setState({ data: snapshot.val() })
      // console.log(snapshot.val().euro2020.matches)
      // let users = Object.assign({}, snapshot.val().users)
      // for (var key in polls) {
      // let poll = polls[key]
      // poll.users['+61430985344'] = {answer: 0, answered: true}
      // polls[key] = poll
      // }
    })
    // matches.forEach(match => {
    //   database.ref().child('euro2020/matches').push(match)
    // })

    let number = window.localStorage.getItem('number')
    this.setState({ hidden: !!number })
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      // console.log(user)
      if (!!user) {
        this.setState({ number: user.phoneNumber })
        window.localStorage.setItem('number', user.phoneNumber)

        // database.ref("/users").once("value", snap => {
        //   let updatedUser = Object.assign({}, snap.val()[user.phoneNumber]);
        //   updatedUser.updated = "v1.1";
        //   database
        //     .ref("/")
        //     .child("users/" + user.phoneNumber)
        //     .update(updatedUser);
        // });
      }
    })
  }

  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  removeNumber() {
    this.setState({ number: null, hidden: false })
  }

  render() {
    return (
      <div>
        {this.state.number ? (
          !!this.state.data.users ? (
            Object.keys(this.state.data.users).includes(this.state.number) ? (
              <Router>
                <div>
                  <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/euro2020/matches" />}
                  />

                  <Route
                    exact
                    path="/euro2020"
                    render={() => <Redirect to="/euro2020/matches" />}
                  />

                  <Route
                    path="/euro2020"
                    render={(props) => <Header {...props} />}
                  />

                  <div>
                    <Switch>
                      <Route path="/ourstory" render={() => <OurStory />} />

                      <Route
                        path="/euro2020/newpoll"
                        render={() => (
                          <NewPoll
                            polls={this.state.data.polls}
                            users={this.state.data.users}
                            teams={this.state.data.teams}
                            database={database}
                          />
                        )}
                      />
                      <Route
                        path="/euro2020/table"
                        render={() => (
                          <Table
                            polls={this.state.data.polls}
                            matches={this.state.data.euro2020.matches}
                            users={this.state.data.users}
                            teams={this.state.data.teams}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/euro2020/matches"
                        render={() => (
                          <Matches
                            matches={this.state.data.euro2020.matches}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/euro2020/teams"
                        render={() => (
                          <Teams
                            matches={this.state.data.matches}
                            teams={this.state.data.teams}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/logout"
                        render={() => (
                          <LogOut
                            auth={firebase.auth()}
                            removeNumber={this.logOut}
                          />
                        )}
                      />
                    </Switch>
                  </div>
                </div>
              </Router>
            ) : (
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  flexFlow: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h1>
                  Thanks for visiting my website.
                  <br />
                  It's currently for my personal use.
                  <br /> You can find out more about me{' '}
                  <a href="https://www.linkedin.com/in/jonathanlouisng/">
                    here
                  </a>
                  .
                </h1>
              </div>
            )
          ) : (
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i
                className="fa fa-futbol-o fa-spin"
                style={{ fontSize: '2em' }}
              />
              <h1>Loading</h1>
            </div>
          )
        ) : (
          <div style={{ width: this.state.hidden ? '0' : '100%' }}>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Root
