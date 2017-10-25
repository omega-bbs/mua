import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import TopicItem from "./TopicItem";

const Container = styled.div``;

Container.Item = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

class TopicList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const list = this.props.data;
    return (
      <Container>
        {list.map(item => (
          <Container.Item key={item.id}>
            <TopicItem data={item} />
          </Container.Item>
        ))}
      </Container>
    );
  }
}

export default TopicList;
