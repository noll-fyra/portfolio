import React from 'react'
import './contact.css'

const Contact = (props) => (
  <div className={'contact'}>
    <div className='contactDiv starter' />
    <div className='contactDiv social'>
      <a href='tel:65-87427184'><span className='fa fa-mobile socialIcon' /></a>
      <a href='mailto:jonathanlouisng@gmail.com'><span className='fa fa-envelope socialIcon' /></a>
      <a href='https://github.com/noll-fyra'><span className='fa fa-github socialIcon' /></a>
      <a href='https://www.linkedin.com/in/jonathanlouisng/'><span className='fa fa-linkedin socialIcon' /></a>
      <a href='https://www.facebook.com/jonathanlouisng'><span className='fa fa-facebook-f socialIcon' /></a>
    </div>
    <div className='contactDiv name'>
      Jonathan Louis Ng
    </div>
    <div className='contactDiv ender'>
      <span onClick={() => props.handleShowing('none')} className='fa fa-times-circle' />
    </div>
  </div>
)

export default Contact
