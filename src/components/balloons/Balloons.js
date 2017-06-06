import React from 'react'
import './balloons.css'

class Balloons extends React.Component {

  render () {
    return (
      <div className='balloons'>
        <div className='balloon' onClick={() => this.props.handleProject(0)} />
        <div className='balloon' onClick={() => this.props.handleProject(1)} />
        <div className='balloon' onClick={() => this.props.handleProject(2)} />
        <div className='balloon' onClick={() => this.props.handleProject(3)} />
        <div className='balloon' onClick={() => this.props.handleProject(4)} />
      </div>
    )
  }

}

export default Balloons
