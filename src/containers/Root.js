import React, { Component } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import axios from 'axios'
// import * as firebaseui from 'firebaseui'
// import App from '../components/app/App'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import WorldCupHeader from './worldCup/WorldCupHeader'
import Polls from './worldCup/Polls'
import Table from './worldCup/Table'
import Matches from './worldCup/Matches'
import Teams from './worldCup/Teams'
// import Poll from './Poll'
import NewPoll from './worldCup/NewPoll'
import EditPoll from './worldCup/EditPoll'
import FPL from './fpl/Index'
import Christmas from './christmas/Index'
import OurStory from './ourstory/Index'
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

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      number: null,
      hidden: true,
      fplData: {}
    }
    this.removeNumber = this.removeNumber.bind(this)
    this.unregisterAuthObserver = null
    this.uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          window.localStorage.setItem('number', authResult.user.phoneNumber)
          this.setState({ number: authResult.user.phoneNumber })
          // console.log(authResult, redirectUrl, this.state);
          return false
        }.bind(this)
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
      ]
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    database.ref('/').on('value', snap => {
      this.setState({ data: snap.val() })
      // let users = Object.assign({}, snap.val().users)
      // for (var key in polls) {
      // let poll = polls[key]
      // poll.users['+61430985344'] = {answer: 0, answered: true}
      // polls[key] = poll
      // }
      // database.ref().child('polls').set(polls)
    })

    let number = window.localStorage.getItem('number')
    this.setState({ hidden: !!number })
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
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

    const fplPath =
      'https://fantasy.premierleague.com/drf/leagues-classic-standings/181651'

    // site went down
    // const allorigins =
    //   "https://allorigins.me/get?url=" +
    //   encodeURIComponent(fplPath) +
    //   "&callback=?";

    // const allOrigins =
    //   'https://api.allorigins.ml/get?method=raw&url=' +
    //   encodeURIComponent(fplPath) +
    //   '&callback=?'
    //
    // axios
    //   .get(allOrigins)
    //   .then(res => {
    //     // console.log(res)
    //
    //     let data = JSON.parse(
    //       JSON.parse(
    //         res.data.split("typeof  === 'function' && (")[1].split(');')[0]
    //       ).contents
    //     )
    //     // console.log(data)
    //     this.setState({ fplData: data })
    //   })
    //   .catch(err => console.error(err))
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
                    render={() => <Redirect to="/christmas" />}
                  />

                  <Route
                    exact
                    path="/worldcup"
                    render={() => <Redirect to="/worldcup/polls" />}
                  />

                  <Route
                    path="/worldcup"
                    render={props => <WorldCupHeader {...props} />}
                  />

                  <div>
                    <Switch>
                      <Route
                        path="/christmas"
                        render={() => (
                          <Christmas
                            data={this.state.data.christmas}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />

                      <Route
                        path="/fpl"
                        render={() => (
                          <FPL
                            data={this.state.data.fpl['1819']}
                            database={database}
                            number={this.state.number}
                            fplData={this.state.fplData}
                          />
                        )}
                      />

                      <Route path="/ourstory" render={() => <OurStory />} />

                      <Route
                        path="/worldcup/polls"
                        render={() => (
                          <Polls
                            polls={this.state.data.polls}
                            users={this.state.data.users}
                            teams={this.state.data.teams}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/worldcup/newpoll"
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
                        path="/worldcup/editpoll"
                        render={() => (
                          <EditPoll
                            polls={this.state.data.polls}
                            users={this.state.data.users}
                            teams={this.state.data.teams}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/worldcup/table"
                        render={() => (
                          <Table
                            polls={this.state.data.polls}
                            users={this.state.data.users}
                            teams={this.state.data.teams}
                            database={database}
                            storage={firebase.storage()}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/worldcup/matches"
                        render={() => (
                          <Matches
                            matches={this.state.data.matches}
                            teams={this.state.data.teams}
                            database={database}
                            number={this.state.number}
                          />
                        )}
                      />
                      <Route
                        path="/worldcup/teams"
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
                  alignItems: 'center'
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
                alignItems: 'center'
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
