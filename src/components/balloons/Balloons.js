import React from 'react'
import './balloons.css'

class Balloons extends React.Component {

  render () {
    return (
      <div className='balloons'>
        <div className='balloon' onClick={() => this.props.handleShowing('projects')} />
        <div className='balloon' onClick={() => this.props.handleShowing('projects')} />
        <div className='balloon' onClick={() => this.props.handleShowing('projects')} />
        <div className='balloon' onClick={() => this.props.handleShowing('projects')} />
        <div className='balloon' onClick={() => this.props.handleShowing('projects')} />
      </div>
    )
  }

}

export default Balloons
