import React from 'react'
import './projects.css'

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0
    }
    this.handleCurrent = this.handleCurrent.bind(this)
  }
  handleCurrent (index) {
    this.setState({
      current: index
    })
  }
  render () {
    return (
      <div className='projects' onClick={() => this.props.handleShowing('none')}>
        <ul>
          <li className='project' onClick={() => this.handleCurrent(0)}>
            <div className='projectDiv project1' />
            <div className='modal' />
          </li>
          <li className='project' onClick={() => this.handleCurrent(1)}>
            <div className='projectDiv project2' />
            <div className='modal' />
          </li>
          <li className='project' onClick={() => this.handleCurrent(2)}>
            <div className='projectDiv project3' />
            <div className='modal' />
          </li>
          <li className='project' onClick={() => this.handleCurrent(3)}>
            <div className='projectDiv project4' />
            <div className='modal' />
          </li>
        </ul>
      </div>
    )
  }

}

export default Project
