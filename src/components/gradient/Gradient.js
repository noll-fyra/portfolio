import React from 'react'
import './gradient.css'

class Gradient extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: []
    }
    this.toggleHover = this.toggleHover.bind(this)
  }

  componentDidMount () {
    let hover = new Array(this.props.text.length).fill(false)
    this.setState({
      hover: hover
    })
  }

  toggleHover (index) {
    let hover = this.state.hover.slice()
    hover[index] = !hover[index]
    this.setState({
      hover: hover
    })
  }

  render () {
    const gradient = this.props.text.split('').map((char, index) => {
      if (char === ' ') {
        return <span className='gradientText' key={index}>&nbsp;</span>
      } else {
        return (
          <span
            key={index}
            className='gradientText'
            style={this.state.hover[index] ? {color: `rgb(${Math.floor((index + 1) * 255 / this.props.text.length)}, 0, ${Math.floor(255 - ((index + 1) * 255 / this.props.text.length))})`} : {color: 'black'}}
            onMouseOver={() => this.toggleHover(index)}
            onMouseOut={() => this.toggleHover(index)}
            onTouchStart={() => this.toggleHover(index)}
            onTouchEnd={() => this.toggleHover(index)}
            onTouchMove={() => this.toggleHover(index)}
            >
            {char}
          </span>
        )
      }
    })

    return (
      <div className='gradientContainer'>
        {gradient}
      </div>
    )
  }

}

export default Gradient
