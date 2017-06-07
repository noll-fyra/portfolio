import React from 'react'
import './projects.css'

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      project: props.project
    }
    this.handlePagination = this.handlePagination.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      project: nextProps.project
    })
  }

  handlePagination (direction) {
    if (direction === 'forward') {
      this.state.project === 4 ? this.props.handleProject(0) : this.props.handleProject(this.state.project + 1)
    } else {
      this.state.project === 0 ? this.props.handleProject(4) : this.props.handleProject(this.state.project - 1)
    }
    console.log(direction)
  }

  render () {
    return (
      <div className='projects'>
        <ul>
          <li className='projectOption' onClick={() => this.props.handleProject(0)}>
            <div className='projectDiv project0' />
            <div className={'modal ' + (this.state.project === 0 ? 'modalActive' : 'modalInactive')}>Population: One</div>
          </li>
          <li className='projectOption' onClick={() => this.props.handleProject(1)}>
            <div className='projectDiv project1' />
            <div className={'modal ' + (this.state.project === 1 ? 'modalActive' : 'modalInactive')}>Locavorus</div>
          </li>
          <li className='projectOption' onClick={() => this.props.handleProject(2)}>
            <div className='projectDiv project2' />
            <div className={'modal ' + (this.state.project === 2 ? 'modalActive' : 'modalInactive')}>Love Confidently</div>
          </li>
          <li className='projectOption' onClick={() => this.props.handleProject(3)}>
            <div className='projectDiv project3' />
            <div className={'modal ' + (this.state.project === 3 ? 'modalActive' : 'modalInactive')}>Locavorus Rex</div>
          </li>
          <li className='projectOption' onClick={() => this.props.handleProject(4)}>
            <div className='projectDiv project4' />
            <div className={'modal ' + (this.state.project === 4 ? 'modalActive' : 'modalInactive')}>Via Postale</div>
          </li>
        </ul>
        <div className='projectMain'>
          <div className='projectDetails' onClick={() => this.handlePagination('back')}>
            <span className='fa fa-angle-left' />
          </div>
          <div className={'projectImage project' + this.state.project} />
          <div className='projectDetails' onClick={() => this.handlePagination('forward')}>
            <span className='fa fa-angle-right' />
          </div>
          <div className='projectCommentsContainer' >
            <div className='projectComments'>about this project</div>
            <div className='projectComments'>
              <span className='projectCommentsSpan'>View the code</span>
              <span onClick={() => this.props.handleShowing('none')} className='fa fa-times-circle projectCommentsSpan projectCommentsSpanEnder' />
              <span className='projectCommentsSpan'>Try the site</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Project
