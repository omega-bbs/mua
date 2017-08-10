import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Logo = styled.img`
  display: block;
  width: 10rem;
  height: 10rem;
`

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: normal;
`

const Contributers = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 960px) {
    display: none;
  }
`

const Contributer = styled.section`
  display: flex;
  align-items: center;
  margin: 2rem;
`

Contributer.Avatar = styled.img`
  display: block;
  width: 5rem;
  height: 5rem;
  border: 2px solid #000;
`

Contributer.Content = styled.div`
  flex: 1;
  padding: 0 2rem;
`

Contributer.Name = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: normal;
`

Contributer.Title = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
`

class Introduction extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Logo src="https://omega-bbs.github.io/logo/logo.png" />
          <Title>ω bbs</Title>
        </Header>
        <Contributers>
          <Contributer>
            <Contributer.Avatar src="https://avatars0.githubusercontent.com/u/1610614" />
            <Contributer.Content>
              <Contributer.Name>指针</Contributer.Name>
              <Contributer.Title>主催</Contributer.Title>
            </Contributer.Content>
          </Contributer>
          <Contributer>
            <Contributer.Avatar src="https://avatars1.githubusercontent.com/u/905663" />
            <Contributer.Content>
              <Contributer.Name>三三</Contributer.Name>
              <Contributer.Title>开发</Contributer.Title>
            </Contributer.Content>
          </Contributer>
          <Contributer>
            <Contributer.Avatar src="https://avatars0.githubusercontent.com/u/359622" />
            <Contributer.Content>
              <Contributer.Name>玲奈</Contributer.Name>
              <Contributer.Title>甲方</Contributer.Title>
            </Contributer.Content>
          </Contributer>
        </Contributers>
      </Container>
    )
  }
}

export default Introduction
