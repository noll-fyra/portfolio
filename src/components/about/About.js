import React from 'react'
import './about.css'

const About = (props) => (
  <div className='about'>
    <div className='aboutStarter'>
      <h1>About Me</h1>
      <p>I am fantastic.</p>
      <p>I am awesome.</p>
      <p>I am the most humble of people.</p>
      <h1 className='hireMe'><i>Hire me.</i></h1>
    </div>
    <div className='aboutEnder'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default About
