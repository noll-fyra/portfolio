import React from 'react'
import './about.css'

const About = (props) => (
  <div className='about'>
    <div className='aboutStarter'>About Me</div>
    <div className='aboutEnder'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default About
