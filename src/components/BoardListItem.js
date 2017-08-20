import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 2.5rem;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);

  &.active {
    font-weight: 600;
    color: #3f51b5;
  }
`

Container.Indicator = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: #e0e0e0;
`

Container.Text = styled.div``

class BoardListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const data = this.props.data
    return (
      <Container exact to={data.slug ? `/board/${data.slug}` : '/'}>
        <Container.Indicator />
        <Container.Text>
          {data.name}
        </Container.Text>
      </Container>
    )
  }
}

export default BoardListItem
