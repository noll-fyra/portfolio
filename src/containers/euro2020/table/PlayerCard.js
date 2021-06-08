import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayerHistory from './PlayerHistory'
import constants from '../data/constants'

class PlayerCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    let { player } = this.props
    let { expanded } = this.state

    return (
      <div>
        <div onClick={this.toggleExpand} style={{display: 'flex', cursor: 'pointer', padding: '8px', backgroundColor: expanded ? constants.colors.teal : ''}}>
          <div style={{width: '15%', textAlign: 'center', fontSize: '24px'}}><strong>{player.position}</strong></div>
          <div style={{width: '70%', fontSize: '24px'}}><strong>{player.name}</strong></div>
          <div style={{width: '15%', textAlign: 'center', fontSize: '24px'}}><strong>{player.score}</strong></div>
        </div>
          {this.state.expanded &&
            <PlayerHistory player={player} />
          }
      </div>
    )
  }
}

PlayerCard.propTypes = {
  position: PropTypes.number,
  name: PropTypes.string,
  score: PropTypes.number
}

export default PlayerCard
