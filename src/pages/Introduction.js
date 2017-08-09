import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  display: block;
  width: 160px;
  height: 160px;
`

class Introduction extends React.Component {
  render() {
    return (
      <Container>
        <Logo src="https://omega-bbs.github.io/logo/logo.png" />
      </Container>
    )
  }
}

export default Introduction
