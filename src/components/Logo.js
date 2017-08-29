import React from "react";
import styled from "styled-components";

import Icon from "../ui/components/Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

Container.Image = styled(Icon)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  fill: currentColor;
`;

Container.Text = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 3rem;
`;

class Logo extends React.Component {
  render() {
    return (
      <Container>
        <Container.Image name="logo" />
        <Container.Text>ω bbs</Container.Text>
      </Container>
    );
  }
}

export default Logo;
