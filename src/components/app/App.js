import React, { Component } from 'react'
import Balloons from '../balloons/Balloons'
import Gradient from '../gradient/Gradient'
import Projects from '../projects/Projects'
import About from '../about/About'
import Contact from '../contact/Contact'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showing: 'none',
      hovering: 'none',
      project: 0
    }
    this.handleShowing = this.handleShowing.bind(this)
    this.handleHovering = this.handleHovering.bind(this)
    this.handleProject = this.handleProject.bind(this)
  }

  handleShowing (section) {
    this.setState({
      showing: section
    })
  }

  handleHovering (section) {
    this.setState({
      hovering: section
    })
  }

  handleProject (index) {
    this.setState({
      showing: 'projects',
      project: index
    })
  }

  render () {
    return (
      <div className='App'>
        <div className='centre' onClick={() => this.handleShowing('none')}>
          <Gradient className='centreText' text='JONATHAN LOUIS NG' />
        </div>
        <Balloons handleProject={this.handleProject} />
        <div className='buttonContainer'>
          <button className='sideButton aboutButton'
            onClick={() => this.handleShowing('about')}
            onMouseOver={() => this.handleHovering('about')}
            onMouseOut={() => this.handleHovering('none')}
          >About Me</button>
          <button className='sideButton projectsButton'
            onClick={() => this.handleShowing('projects')}
            onMouseOver={() => this.handleHovering('projects')}
            onMouseOut={() => this.handleHovering('none')}
          >Projects</button>
          <button className='sideButton contactButton'
            onClick={() => this.handleShowing('contact')}
            onMouseOver={() => this.handleHovering('contact')}
            onMouseOut={() => this.handleHovering('none')}
          >Contact</button>
        </div>
        <div className={'bottomContainer ' + (this.state.showing === 'about' ? 'bottomAboutActive' : this.state.showing === 'projects' ? 'bottomProjectsActive' : this.state.showing === 'contact' ? 'bottomContactActive' : '')} style={this.state.hovering === 'none' ? {} : this.state.hovering === 'about' ? {backgroundColor: 'hsl(215, 50%, 65%)'} : this.state.hovering === 'projects' ? {backgroundColor: 'hsl(139, 30%, 50%)'} : {backgroundColor: 'hsl(23, 55%, 57%)'}} />

        <div className={'appFooter ' + (this.state.showing === 'about' ? 'footerActive' : 'footerInactive')}>
          <About handleShowing={this.handleShowing} />
        </div>

        <div className={'appFooter ' + (this.state.showing === 'projects' ? 'footerActive' : 'footerInactive')}>
          <Projects handleShowing={this.handleShowing} handleProject={this.handleProject} project={this.state.project} />
        </div>

        <div className={'appFooter ' + (this.state.showing === 'contact' ? 'footerActive' : 'footerInactive')}>
          <Contact handleShowing={this.handleShowing} />
        </div>
      </div>
    )
  }
}

export default App
