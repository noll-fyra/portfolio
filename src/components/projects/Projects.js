import React from 'react'
import './projects.css'

const text =
  [
    ['Population: One is a top-down zombie survival game for two players. The objective is to be the last player standing after a relentless zombie horde attacks. Players have to dodge increasing numbers of zombies as well as fixed obstacles, aided only by 1 of 6 special abilities.', 'A chilling soundtrack and ominous countdown forewarn the danger that lies ahead. A helpful hint tries to add levity to a serious situation.', 'Avoid the obstacles and the zombies and outrun your opponent to win. Use your limited special power charges sparingly.'],
    ['Locavorus aims to manage the complete life cycle of hospitality customer service, from before they patronise the business to well after their meal.', 'Customers can make service requests directly to the staff without having to signal for their attention, reducing inefficiency and increasing customer satisfaction.', 'Orders are sent directly to the kitchen, so customers get their food more quickly and more accurately. Dietary notes can be passed as well.', 'The restaurant can manage their menu here, to keep track of their offerings, while letting customers view the food options online.', 'Locavorus caters to both customers and restaurants.'],
    ['Finished in one night for the UN Women Hackathon, Love Confidently aims to help women in developing countries by educating them about contraception, making it easy to find and use contraceptives, tracking their condition and connecting them with medical professionals.', 'All women have different needs and respond differently to contraception. We set up a simple survey to help narrow down the most appropriate and relevant method for each woman, while also allowing them to browse and compare the different methods on their own.', 'We used a simple geolocation implementation to find all medical supply stores near you, which would ideally provide information about what stores carried which contraceptives and how much they cost.', 'We implemented socket.io to enable real time communication. The idea was that women in need could contact a medical professional to get immediate advice on their contraception or just to address any concerns they might have.', 'We used Twilio SMS to implement a tracking feature where women opting in would receive a message every day at the same time.', 'The response would be tracked and a follow-up message might be sent depending on the patient\'s history.'],
    ['Locavorus Rex is an application for restaurants and other food businesses to manage their reservations, queue and orders. It aims to improve customer service by making various aspects of the service life cycle more efficient.', 'Customers can make reservations quickly and easily, and an email confirmation is sent soon after.', 'Queuing is hassle-free. Just enter your details and be contacted when your table is ready. You can check your estimated wait at any time.', 'The system automatically notifies you when your wait is over.', 'Customers can also make takeaway orders online.', 'Easy online payment is integrated via Stripe.', 'Businesses can manage their reservations, queues and orders from a dashboard.', 'The kitchen receives orders directly, which are prioritised automatically by time, and include future orders e.g. takeaways and reservations.', 'Restaurants can also get a quick glance at their active and completed orders/invoices.'],
    ['Via Postale is a travel-focused social media site that is best described as Instagram x Pinterest x TripAdvisor. Users post their travel experiences, complete with description and rating. Other users can in turn search for activities and places, saving those that interest them to plan future trips.', 'Users post images of their activities. We try to prefill the fields from image EXIF data to simplify the process.', 'Users can view other users\' trips and activities and follow those they like.', 'Users can save activities they like for future reference.', 'Users can plan their own trips around activities they have saved.']
  ]

const builtWith =
  [
    'JavaScript | jQuery | HTML5 | CSS3',
    'Node.js | Express | socket.io | MongoDB | JavaScript | HTML5 | CSS3',
    'Node.js | Express | socket.io | Google Maps | Twilio | MongoDB | JavaScript | HTML | Bootstrap',
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

const images =
  [
      ['https://i.imgur.com/79eNOe5h.png', 'https://i.imgur.com/rKxKPHfh.png', 'https://i.imgur.com/xtVG7dyh.png'],
      ['https://i.imgur.com/zBILyBoh.png', 'https://i.imgur.com/hSIMlk9h.png', 'https://i.imgur.com/BhJ3mN3h.png', 'https://i.imgur.com/RUlN3frh.png', 'https://i.imgur.com/KEQb77rh.png'],
      ['https://i.imgur.com/YI1ajgWh.png', 'https://i.imgur.com/Elij0x5h.png', 'https://i.imgur.com/CHJ5yRyh.png', 'https://i.imgur.com/opHQRxmh.png', 'https://i.imgur.com/Jt9IBn7h.png', 'https://i.imgur.com/B2nD434h.png'],
      ['https://i.imgur.com/NrsI8Ueh.png', 'https://i.imgur.com/ItgnGDth.png', 'https://i.imgur.com/VNEfRAth.png', 'https://i.imgur.com/ljKzWwoh.png', 'https://i.imgur.com/PZEJ5xCh.png', 'https://i.imgur.com/3bGzLoIh.png', 'https://i.imgur.com/iCsmqurh.png', 'https://i.imgur.com/NimOPLjh.png', 'https://i.imgur.com/B1IQLuQh.png'],
      ['https://i.imgur.com/6OwwM9uh.png', 'https://i.imgur.com/Acs6znnh.png', 'https://i.imgur.com/Hmgnwz4h.png', 'https://i.imgur.com/oR5PR31h.png', 'https://i.imgur.com/Hw4HkEch.png']
  ]

class Project extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      project: props.project,
      page: [0, 0, 0, 0, 0],
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
    let currentPage = this.state.page[this.props.project]
    let currentState = this.state.page
    if (direction === 'forward') {
      currentState[this.props.project] = currentPage === (images[this.props.project].length - 1) ? 0 : currentPage + 1
    } else {
      currentState[this.props.project] = currentPage === 0 ? (images[this.props.project].length - 1) : currentPage - 1
    }
    this.setState({
      page: currentState
    })
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
          <div className='projectImage' style={{backgroundImage: `url(${images[this.state.project][this.state.page[this.state.project]]})`}} />
          <div className='projectCommentsContainer' onMouseOver={this.handleHovering} onMouseOut={this.handleHovering}>
            <div className='projectComments'>
              {text[this.state.project][this.state.page[this.state.project]]}
            </div>
            <div className='projectBuiltWith'>
              {builtWith[this.state.project]}
            </div>
          </div>
          <div className='projectDetails' onClick={() => this.handlePagination('forward')}>
            <span className='fa fa-angle-right' />
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
