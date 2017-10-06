import React from 'react'
import poem from './poem'
import images from './images'
import './cara.css'

const Cara = (props) => (
  <div className='cara'>
    {poem.map((line, index) => {
      return <div key={index} className='line'>
        <div className='heading'>{line}</div>
        <img className='image' src={images[index]} alt={line} />
      </div>
    })}
    <div className='wholeDiv'>
      <img className='final' src='https://res.cloudinary.com/noll-fyra/image/upload/v1507310678/IMG_0931_ob2upn.jpg' alt='youAndMe' />
    </div>
  </div>
)

export default Cara
