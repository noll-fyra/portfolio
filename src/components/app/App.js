import React, { Component } from 'react'
import Gradient from '../gradient/Gradient'
import Projects from '../projects/Projects'
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
        <div className='centre' onClick={()=>this.handleShowing('none')}>
          <Gradient text='JONATHAN' />
          <Gradient text='LOUIS NG' />
        </div>
        <button className='sideButton projectsButton' onClick={() => this.handleShowing('projects')}>Projects</button>
        <button className='sideButton contactButton' onClick={() => this.handleShowing('contact')}>Contact</button>
        {this.state.showing === 'projects' &&
        <Projects handleShowing={this.handleShowing} showing={this.state.showing === 'projects'} />
      }
        {this.state.showing === 'contact' &&
        <Footer handleShowing={this.handleShowing} showing={this.state.showing === 'contact'} />
        }
      </div>
    )
  }
}

export default App
