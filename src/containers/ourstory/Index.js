import React, { Component } from 'react'
import styled from 'styled-components'

const memories = [
  {
    date: '27 August 2018',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032637/IMG_1177_nuek8y.jpg'
  },
  {
    date: '28 September 2018',
    story:
      'The look of ecstasy I have on my face whenever you’re close. Biting = love',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032635/e541e217-eda8-47d7-899a-030a68a5df3b_zfynxl.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_2614_qvdzxd.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_2038_kuhweq.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_1714_ggzdac.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032609/IMG_0057_n5fcax.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032607/DSCF4998_t4mv7u.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032607/IMG_1027_orzilg.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032604/IMG_0647_ksgxxf.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032604/IMG_0407_mthnt0.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032602/IMG_1331_s5iak7.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032600/IMG_0826_u9ulnr.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9386_qzn5zm.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_0032_wtkgjp.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9687_spnqey.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9192_xxmhko.jpg'
  },
  {
    date: '',
    story: '',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_0609_a507fq.jpg'
  }
]

const photoSplit = 'https://res.cloudinary.com/noll-fyra/image/upload/'
const photoTransform = 'c_scale,q_auto,w_600/'

const Memory = ({ memory }) => (
  <MemoryContainer>
    <Circle>
      <InnerCircle />
    </Circle>
    <ImageContainer>
      <Image
        src={photoSplit
          .concat(photoTransform)
          .concat(memory.image.split(photoSplit)[1])}
      />
      <span>{memory.date}</span>
      <span>{memory.story}</span>
    </ImageContainer>
  </MemoryContainer>
)

class OurStory extends Component {
  render() {
    return (
      <Container>
        <h1>Our Story</h1>

        <TimelineContainer>
          <Timeline />
          <div>
            {memories.map(m => (
              <Memory key={m.image} memory={m} />
            ))}
          </div>
        </TimelineContainer>
      </Container>
    )
  }
}

export default OurStory

const Container = styled.div`
  padding: 12px;
  margin-left: 24px;
`

const Timeline = styled.div`
  width: 8px;
  height: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
`

const TimelineContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  height: 3200px;
  margin: 0 auto;
`

const MemoryContainer = styled.div`
  width: 100vw;
  max-width: 640px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
  left: -24px;
  padding: 2px;
`

const Circle = styled.div`
  min-width: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid white;
  margin-right: 24px;
  padding: 2px;

  &:after {
    content: '';
    position: absolute;
    right: 58px;
    top: 0%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-right-color: #00aabb;
    border-left: 0;
    margin-top: 6px;
    margin-left: 0px;
  }
`

const InnerCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
`

// const Line = styled.div`
//   height: 0;
//   width: 48px;
//   border-top: 1px solid black;
//   border-bottom: 1px solid black;
// `

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: #00aabb;
  border-radius: 0.4em;
  height: 188px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`
