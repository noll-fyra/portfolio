import React, { Component } from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  // Redirect,
  NavLink
} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import axios from 'axios'
// import * as firebaseui from 'firebaseui'
// import App from '../components/app/App'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Polls from './worldCup/Polls'
import Table from './worldCup/Table'
import Matches from './worldCup/Matches'
import Teams from './worldCup/Teams'
// import Poll from './Poll'
import NewPoll from './worldCup/NewPoll'
import EditPoll from './worldCup/EditPoll'
import FPL from './fpl/Index'
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

const sections = ['polls', 'table', 'matches', 'teams']
// const hidden = ['newpoll']

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

        database.ref('/users').once('value', snap => {
          let updatedUser = Object.assign({}, snap.val()[user.phoneNumber])
          updatedUser.updated = 'v1.1'
          database
            .ref('/')
            .child('users/' + user.phoneNumber)
            .update(updatedUser)
        })
      }
    })

    const path =
      'https://fantasy.premierleague.com/drf/leagues-classic-standings/181651'

    // fetch(myRequest)
    //   .then(res => res.body)
    //   .then(resp => console.log(resp))

    // $(document).ready(function () {
    axios
      .get(
        'https://allorigins.me/get?url=' +
          encodeURIComponent(path) +
          '&callback=?'
      )
      .then(res => {
        let data = JSON.parse(
          JSON.parse(
            res.data.split("typeof  === 'function' && (")[1].split(');')[0]
          ).contents
        )
        console.log(data)
        this.setState({ fplData: data })
      })
      .catch(err => console.error(err))
    // }

    // axios
    //   .get(
    //     `http://www.whateverorigin.org/get?url=${encodeURIComponent(
    //       path
    //     )}&callback=?`
    //   )
    //   .then(res => {
    //     console.log(res)
    //     this.setState({ fplData: res.data })
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
          !!this.state.data.users &&
          Object.keys(this.state.data.users).includes(this.state.number) ? (
            <Router>
              <div>
                <Route
                  path="/worldcup"
                  render={() => (
                    <div>
                      <h1 style={{ textAlign: 'center', marginTop: '12px' }}>
                        2018 FIFA WORLD CUP PREDICTION GAME
                      </h1>
                      <div style={{ backgroundColor: '#19364C' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '480px',
                            margin: '12px auto'
                          }}>
                          {sections.map(sect => (
                            <NavLink
                              key={sect}
                              to={`/worldcup/${sect}`}
                              activeStyle={{
                                backgroundColor: 'gold',
                                color: '#19364C'
                              }}
                              style={{
                                width: `calc(100%/${sections.length})`,
                                maxWidth: `calc(480px/${sections.length})`,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px'
                              }}>
                              {sect[0].toUpperCase().concat(sect.slice(1))}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                      {/* {this.state.number === '+6587427184' && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            maxWidth: '480px',
                            margin: '12px auto'
                          }}>
                          {hidden.map(sect => (
                            <NavLink
                              key={sect}
                              to={`/${sect}`}
                              activeStyle={{
                                backgroundColor: 'gold',
                                color: '#19364C'
                              }}
                              style={{
                                width: `calc(100%/${hidden.length})`,
                                maxWidth: `calc(480px/${hidden.length})`,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                padding: '8px'
                              }}>
                              {sect[0].toUpperCase().concat(sect.slice(1))}
                            </NavLink>
                          ))}
                        </div>
                      )} */}
                    </div>
                  )}
                />

                <div>
                  <Switch>
                    {/* <Route exact path="/" render={() => <App />} /> */}
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
              }}>
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
