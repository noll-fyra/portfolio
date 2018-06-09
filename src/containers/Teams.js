import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Teams extends Component {

  render() {
    return (
      <div>
        {!!this.props.teams &&
          JSON.stringify(this.props.teams)
      }</div>
    )
  }
}

Teams.propTypes = {
  teams: PropTypes.object
}

export default Teams
