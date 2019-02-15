import React, { Component } from 'react'
import styled from 'styled-components'

const memories = [
  {
    date: '22 April 2017',
    story:
      'Just one month in to our course and I already had a major crush on you. I loved the way you smiled and the way you laughed and the way every room you entered became brighter.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550190320/IMG_4524_u8xvef.png'
  },
  {
    date: '28 August 2018',
    story: '😍',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_2614_qvdzxd.jpg'
  },
  {
    date: '6 July 2018',
    story:
      "I'm so happy that my family loves you almost as much as me because you are already family to me.",
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_2038_kuhweq.jpg'
  },
  {
    date: '28 April 2018',
    story:
      'I joined taichi to spend more time with you and I haven’t regretted a single second.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032634/IMG_1714_ggzdac.jpg'
  },
  {
    date: '25 November 2017',
    story:
      "It's so easy to be with you. I especially love that you always bring so much joy to everyone around you.",
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032609/IMG_0057_n5fcax.jpg'
  },
  {
    date: '27 January 2018',
    story:
      'Thank you for being so supportive of everything I do. You have such a generous and giving heart.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032607/DSCF4998_t4mv7u.jpg'
  },
  {
    date: '14 February 2018',
    story:
      'Your smile is more heart melting than a bouquet of beautiful flowers. I would do anything to make you smile.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032607/IMG_1027_orzilg.jpg'
  },
  {
    date: '5 January 2018',
    story: 'Looking to adopt.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032604/IMG_0647_ksgxxf.jpg'
  },
  {
    date: '16 December 2017',
    story:
      'We became parents to a fat baby who takes up too much space on the bed.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032604/IMG_0407_mthnt0.jpg'
  },
  {
    date: '17 March 2018',
    story:
      'You are an incredible inspiration to me. You not only overcame cancer, but that you do your best to help fellow survivors and sufferers always makes me so proud to be with you.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032602/IMG_1331_s5iak7.jpg'
  },
  {
    date: '24 September 2017',
    story:
      'I wanted to be with you all the time. You brought the sun to Melbourne with your happiness during the day and I loved making you happy during the night.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032600/IMG_0826_u9ulnr.jpg'
  },
  {
    date: '16 June 2017',
    story:
      'Sitting beside you helping you do your portfolio were some of my happiest moments ever. I didn’t know then that the woman with extremely short hair would turn out to be the love of my life.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9386_qzn5zm.jpg'
  },
  {
    date: '29 July 2017',
    story:
      'All I knew was that I was completely smitten. You are so beautiful.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_0032_wtkgjp.jpg'
  },
  {
    date: '2 July 2017',
    story:
      'I saw your wild side for the first time and I was shocked. I wasn’t sure what I was getting myself into.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9687_spnqey.jpg'
  },
  {
    date: '4 June 2017',
    story:
      'A bittersweet moment. We graduated from our course but that meant I was running out of time to tell you how I felt. ',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_9192_xxmhko.jpg'
  },
  // {
  //   date: '',
  //   story: '',
  //   image:
  //     'https://res.cloudinary.com/noll-fyra/image/upload/v1550032570/IMG_0609_a507fq.jpg'
  // },
  {
    date: '28 September 2018',
    story:
      'I love you so much I will pretend to have a look of ecstasy whenever you’re biting me.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550032635/e541e217-eda8-47d7-899a-030a68a5df3b_zfynxl.jpg'
  },
  {
    date: '14 February 2019',
    story:
      'I love you with all my heart and I want to spend the rest of my life with you.',
    image:
      'https://res.cloudinary.com/noll-fyra/image/upload/v1550190316/IMG_7199_ovhhae.heic'
  }
]

const photoSplit = 'https://res.cloudinary.com/noll-fyra/image/upload/'
const photoTransform = 'c_scale,q_auto,w_600,f_jpg/'

const Memory = ({ memory }) => (
  <MemoryContainer>
    {/*  <Circle>
      <InnerCircle />
    </Circle>*/}
    <ImageContainer>
      <Image
        src={photoSplit
          .concat(photoTransform)
          .concat(memory.image.split(photoSplit)[1])}
      />
      <div style={{ backgroundColor: 'white', padding: '12px' }}>
        <strong>{memory.date}</strong>
        <br />
        <br />
        <span>{memory.story}</span>
      </div>
    </ImageContainer>
  </MemoryContainer>
)

class OurStory extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <Container>
        <h1 style={{ textAlign: 'center' }}>Our Story So Far</h1>
        <br />
        <br />

        <TimelineContainer>
          {/* <Timeline /> */}
          <div>
            {memories
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(m => (
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
  /* margin-left: 24px; */
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
  width: 100%;
  max-width: 640px;
  display: flex;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 24px;
  /* position: relative; */
  /* left: -24px; */
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
  border: 1px solid lightgrey;
  /* background-color: #00aabb; */
  border-radius: 0.4em;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
`
