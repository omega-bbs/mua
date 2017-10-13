import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "../ui/components/Icon";

const Container = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

Container.Title = styled.div`
  display: flex;
  flex: 1;
  line-height: 2rem;
`;

Container.Meta = styled.div`
  display: flex;
`;

Container.MetaItem = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;

Container.MetaIcon = styled(Icon)`
  fill: rgba(0, 0, 0, 0.6);
`;

Container.MetaText = styled.div`
  font-size: ${13 / 16}rem;
  color: rgba(0, 0, 0, 0.6);
`;

class TopicItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const data = this.props.data;
    return (
      <Container>
        <Container.Title>{data.title}</Container.Title>
        <Container.Meta>
          <Container.MetaItem>
            <Container.MetaIcon name="post" />
            <Container.MetaText>{data.postCount}</Container.MetaText>
          </Container.MetaItem>
        </Container.Meta>
      </Container>
    );
  }
}

export default TopicItem;
