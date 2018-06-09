import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Polls extends Component {

  render() {
    const { polls } = this.props
    return (
      <div>
        {!!this.props.polls &&
          Object.keys(polls)
          .map(key => Object.assign({}, polls[key], {id: key}))
          .map(poll =>
          <Link key={poll.id} to={`/polls/${poll.id}`} style={{marginBottom: '12px'}}>
            <h1>{poll.title}</h1>
            {/* {poll.options.map(opt =>
            <div key={poll.id.concat(opt.option)}>{opt.option}</div>)} */}
            {/* {JSON.stringify(poll)} */}
          </Link>)
      }
      <Link to='/polls/new'>New Poll</Link>
    </div>
    )
  }
}

Polls.propTypes = {
  polls: PropTypes.object
}

export default Polls
