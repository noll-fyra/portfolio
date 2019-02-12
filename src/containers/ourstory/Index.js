import React, { Component } from 'react'
import styled from 'styled-components'

const Memory = () => (
  <MemoryContainer>
    <Circle>
      <InnerCircle />
    </Circle>
    <ImageContainer>memory</ImageContainer>
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(m => (
              <Memory key={m} />
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
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
  left: -22px;
`

const Circle = styled.div`
  min-width: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid white;
  margin-right: 48px;
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

const Line = styled.div`
  height: 0;
  width: 48px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`

const ImageContainer = styled.div`
  width: 100%;
  max-width: 640px;
  position: relative;
  background: #00aabb;
  border-radius: 0.4em;
  height: 188px;
`
