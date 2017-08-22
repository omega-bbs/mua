import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import Logo from './Logo'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  border-bottom: 2px solid;
`

Container.Left = styled.div`
  display: flex;
  align-items: center;
`

Container.Right = styled.div`
  display: flex;
  align-items: center;
`

Container.Home = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`

Container.Actions = styled.div`
  display: flex;
  margin: 0 -1rem;
`

Container.Action = styled(NavLink)`
  display: block;
  height: 2.5rem;
  padding: 0 1rem;
  line-height: 2.5rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
`

class AppHeader extends React.Component {
  render() {
    return (
      <Container>
        <Container.Left>
          <Container.Home to="/">
            <Logo />
          </Container.Home>
        </Container.Left>
        <Container.Right>
          <Container.Actions>
            <Container.Action to="/signup">Sign up</Container.Action>
            <Container.Action to="/login">Log in</Container.Action>
          </Container.Actions>
        </Container.Right>
      </Container>
    )
  }
}

export default AppHeader
