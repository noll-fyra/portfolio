import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class LogOut extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.auth.signOut()
    this.props.removeNumber()
    window.localStorage.removeItem('number')
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div />
    )
  }
}

export default LogOut
