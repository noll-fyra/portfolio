import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MotW from './MotW'

class Index extends Component {
  render() {
    const { data, database, number } = this.props
    const users = data.users
    const motw = data.motw
    return (
      <main>
        <h1>Fantasy Premier League 2018-2019</h1>
        <br />
        <MotW motw={motw} users={users} database={database} number={number} />

        <div>users: {JSON.stringify(users)}</div>
        <br />
        <div>motw: {JSON.stringify(motw)}</div>
      </main>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.object.isRequired,
  database: PropTypes.object.isRequired,
  number: PropTypes.string.isRequired
}
