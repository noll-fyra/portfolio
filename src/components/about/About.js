import React from 'react'
import './about.css'

const About = (props) => (
  <div className='about'>
    <div className='aboutStarter'>
      <div className='profileContainer'>
        <div className='profileImage' />
        <div className='profileDetails'>
          <h3 className='tagline'>Hi! I'm Jonathan.</h3>
          <div className='tagline'>
            <span className='tagline'>Problem Solver. Happiness Creator. Efficiency Guru.</span>
          </div>
        </div>
      </div>
      <div className='aboutWords'>
        I work on projects that address real world issues, making peoples' lives better and happier, and try to do all this as efficiently and effectively as possible. I enjoy learning new ways to code, and I derive massive satisfaction from solving programming challenges.
      </div>
    </div>
    <div className='aboutEnder'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default About
