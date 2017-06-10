import React from 'react'
import './about.css'

const About = (props) => (
  <div className='about'>
    <div className='aboutStarter aboutDiv'>
      <div className='profileImage' />
      <div className='profileDetails'>
        <div className='tagline taglineLarge'>
          Hi! I'm Jonathan Louis Ng.
        </div>
        <div className='tagline taglineSmall'>
          Problem Solver. Happiness Creator. Efficiency Guru.
        </div>
      </div>
    </div>
    <div className='aboutWords aboutDiv'>
      <p>I work on projects that address real world issues, making peoples' lives better and happier, and try to do all this as efficiently and effectively as possible. I enjoy learning new ways to code, and I derive massive satisfaction from solving programming challenges.</p>
      <button className='hitMeUp' onClick={() => props.handleShowing('contact')}>Get in touch if you want to make a difference</button>
    </div>
    <div className='aboutSkills aboutDiv'>
      <i className='devicon-javascript-plain skillIcon' />
      <i className='devicon-react-original-wordmark skillIcon' />
      <i className='devicon-html5-plain-wordmark skillIcon' />
      <i className='devicon-css3-plain-wordmark skillIcon' />
      <i className='devicon-rails-plain-wordmark skillIcon' />
      <i class='devicon-jquery-plain-wordmark skillIcon' />
      <i className='devicon-nodejs-plain-wordmark skillIcon' />
      <i className='devicon-express-original-wordmark skillIcon' />
      <i className='devicon-mongodb-plain-wordmark skillIcon' />
      <i className='devicon-postgresql-plain-wordmark skillIcon' />
      <i className='devicon-github-plain-wordmark skillIcon' />
      <i className='devicon-heroku-original-wordmark skillIcon' />
    </div>
    <div className='aboutEnder aboutDiv'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default About
