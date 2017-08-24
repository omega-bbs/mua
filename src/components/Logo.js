import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

Container.Image = styled.img`
  display: block;
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
`;

Container.Text = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
`;

class Logo extends React.Component {
  render() {
    return (
      <Container>
        <Container.Image src="https://omega-bbs.github.io/logo/logo.svg" />
        <Container.Text>ω bbs</Container.Text>
      </Container>
    );
  }
}

export default Logo;
