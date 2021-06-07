import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CountdownTimer extends Component {
  constructor(props) {
      super(props)
      this.state = {
        countdown: null
      }
      this.pollInterval = null
    }

  componentDidMount() {
    let { date } = this.props

    this.pollInterval = window.setInterval(() => {
      let difference = new Date(date) - Date.now()
      if (difference < 0) return

      let hours = Math.floor(difference / 1000 / 60 / 60)

      let minutes =
        hours === 0
          ? Math.floor(difference / 1000 / 60)
          : Math.floor((difference / 1000 / 60) % (hours * 60))

      let seconds =
        hours * 60 * 60 + minutes * 60 === 0
          ? Math.floor(difference / 1000)
          : Math.floor((difference / 1000) % (hours * 60 * 60 + minutes * 60))

      this.setState({
        countdown: [
          hours,
          minutes < 10 ? `0${minutes}` : minutes,
          seconds < 10 ? `0${seconds}` : seconds
        ]
      })
    }, 1000)
  }

  render(){
    let { date } = this.props
    let { countdown } = this.state
    let hasMatchStarted = new Date(date) < Date.now()

    return (
        <div style={{width: '33.3333%', textAlign: 'right'}}>
          {!hasMatchStarted ? (
            countdown && (
              <span>
                <i className="fa fa-clock-o" />&nbsp;{
                  countdown[0]
                }:{countdown[1]}:{countdown[2]}
              </span>
            )
          ) : (
              <span>
                <i className="fa fa-clock-o" />&nbsp;Closed
              </span>
          )}
        </div>
      )
    }
  }


CountdownTimer.propTypes = {
  date: PropTypes.string.isRequired
}

export default CountdownTimer
