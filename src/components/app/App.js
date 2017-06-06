import React, { Component } from 'react'
import Balloons from '../balloons/Balloons'
import Gradient from '../gradient/Gradient'
import Projects from '../projects/Projects'
import About from '../about/About'
import Footer from '../footer/Footer'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showing: 'none'
    }
    this.handleShowing = this.handleShowing.bind(this)
  }

  handleShowing (section) {
    this.setState({
      showing: section
    })
  }

  render () {
    return (
      <div className='App'>

        <div className='centre' onClick={() => this.handleShowing('none')}>
          <Gradient text='JONATHAN' />
          <Gradient text='LOUIS NG' />
        </div>
        <Balloons handleShowing={this.handleShowing} />
        <div className='buttonContainer'>
          <button className='sideButton aboutButton' onClick={() => this.handleShowing('about')}>About Me</button>
          <button className='sideButton projectsButton' onClick={() => this.handleShowing('projects')}>Projects</button>
          <button className='sideButton contactButton' onClick={() => this.handleShowing('contact')}>Contact</button>
        </div>
        {this.state.showing === 'projects' &&
        <Projects handleShowing={this.handleShowing} showing={this.state.showing === 'projects'} />
        }
        {this.state.showing === 'about' &&
        <About handleShowing={this.handleShowing} showing={this.state.showing === 'about'} />
        }
        {this.state.showing === 'contact' &&
        <Footer handleShowing={this.handleShowing} showing={this.state.showing === 'contact'} />
        }
      </div>
    )
  }
}

export default App
