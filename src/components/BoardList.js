import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BoardItem from "./BoardItem";

const Container = styled.div`padding: 0.5rem 0;`;

Container.Divider = styled.div`
  margin: 0.5rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

class BoardList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const list = this.props.data;
    return (
      <Container>
        <BoardItem data={{ id: null, slug: null, name: "All" }} />
        <Container.Divider />
        {list.map(item => <BoardItem key={item.id} data={item} />)}
      </Container>
    );
  }
}

export default BoardList;
