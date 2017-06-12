import React from 'react'
import './projects.css'

const text =
  [
    'Population: One is a top-down zombie survival game for two players. The objective is to be the last player standing after a relentless zombie horde attacks. Players have to dodge increasing numbers of zombies as well as fixed obstacles, aided only by a special ability that their chosen character can use.',
    'Locavorus aims to manage the complete life cycle of hospitality customer service, from before they patronise the business to well after their meal. In its current form, it smooths the customer ordering process by sending their orders directly to the kitchen in real time.',
    'Finished in one night for the UN Women Hackathon 2017, Love Confidently aims to help women in developing countries by educating them about contraception, making it easy to find and use contraceptives, tracking their daily condition and connecting them with medical professionals to address any concerns.',
    'Locavorus Rex is an application for restaurants and other food businesses to manage their reservations, queue and orders. It aims to improve customer service by making various aspects of the service life cycle more efficient.',
    'Via Postale is a travel-focused social media site that is best described as Instagram x Pinterest x TripAdvisor. Users post their travel experiences, complete with description and rating. Other users can in turn search for activities and places, saving those that interest, or are helpful to, them, to plan future trips.'
  ]

const builtWith =
  [
    'JavaScript | jQuery | HTML5 | CSS3',
    'Node.js | Express | socket.io | MongoDB | JavaScript | HTML5 | CSS3',
    'Node.js | Express | socket.io | Google Maps | Twilio | MongoDB | JavaScript | HTML5 | Bootstrap',
    'Ruby on Rails | PostgreSQL | Twilio | JavaScript | HTML5 | Materialize',
    'React | Firebase | CSS3'
  ]

const repos =
  [
    'https://github.com/noll-fyra/wdi-project-1-noll-fyra',
    'https://github.com/noll-fyra/project2',
    'https://github.com/noll-fyra/unwomen-hackathon',
    'https://github.com/wdi-sg/wdi-project-3-there_is_no_i',
    'https://github.com/noll-fyra/viapriori2'
  ]

const sites =
  [
    'https://noll-fyra.github.io/wdi-project-1-noll-fyra/',
    'https://locavorus.herokuapp.com',
    'https://love-confidently.herokuapp.com',
    'https://locavorusrex.herokuapp.com',
    'https://via-priori.firebaseapp.com'
  ]

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      project: props.project,
      hovering: false
    }
    this.handlePagination = this.handlePagination.bind(this)
    this.handleHovering = this.handleHovering.bind(this)
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

  handleHovering () {
    this.setState({
      hovering: !this.state.hovering
    })
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
          <div className='projectCommentsContainer' onMouseOver={this.handleHovering} onMouseOut={this.handleHovering}>
            <div className={'projectComments ' + (this.state.hovering ? '' : 'projectInactive')}>
              {text[this.state.project]}
            </div>
            <div className={'projectBuiltWith ' + (this.state.hovering ? '' : 'projectInactive')}>
              {builtWith[this.state.project]}
            </div>
          </div>
          <div className='projectLinks'>
            <a href={repos[this.state.project]} target='_blank' rel='noopener noreferrer' className='projectCommentsSpan'>
              <button className='viewTheCode'>View the code</button>
            </a>
            <div className='projectCommentsSpan closeButton'>
              <span onClick={() => this.props.handleShowing('none')} className='fa fa-times-circle projectCommentsSpanEnder' />
            </div>
            <a href={sites[this.state.project]} target='_blank' rel='noopener noreferrer' className='projectCommentsSpan'>
              <button className='tryTheSite'>Try the site</button>
            </a>
          </div>
        </div>
      </div>
    )
  }

}

export default Project
