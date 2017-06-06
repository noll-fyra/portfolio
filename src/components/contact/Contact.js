import React from 'react'
import './contact.css'

const Contact = (props) => (
  <div className={'contact'}>
    <div className='starter' />
    <div className='social'>
      <a href='tel:65-87427184'><span className='fa fa-mobile' /></a>
      <a href='mailto:jonathanlouisng@gmail.com'><span className='fa fa-envelope' /></a>
      <a href='https://github.com/noll-fyra'><span className='fa fa-github' /></a>
      <a href='https://www.linkedin.com/in/jonathanlouisng/'><span className='fa fa-linkedin' /></a>
      <a href='https://www.facebook.com/jonathanlouisng'><span className='fa fa-facebook-f' /></a>
    </div>
    <div className='name'>
      <span className='jonathanlouisng'>Jonathan Louis Ng</span>
    </div>
    <div className='ender'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default Contact
