import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 160px;
    height: 160px;
  }
`

class Introduction extends React.Component {
  render() {
    return (
      <Container>
        <img src="https://omega-bbs.github.io/logo/logo.png" />
      </Container>
    )
  }
}

export default Introduction
