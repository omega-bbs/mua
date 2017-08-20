import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BoardListItem from './BoardListItem'

const Container = styled.div`padding: 0.5rem 0;`

Container.Divider = styled.div`
  margin: 0.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

class BoardList extends React.Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const list = this.props.list
    return (
      <Container>
        <BoardListItem data={{ id: null, slug: null, name: 'All' }} />
        <Container.Divider />
        {list.map(item => <BoardListItem key={item.id} data={item} />)}
      </Container>
    )
  }
}

export default BoardList
