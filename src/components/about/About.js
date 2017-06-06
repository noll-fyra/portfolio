import React from 'react'
import './about.css'

const About = (props) => (
  <div className='about'>
    <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    About Me
  </div>
)

export default About
