import React from "react";
import styled from "styled-components";

import Icon from "../ui/components/Icon";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Logo = styled(Icon)`
  position: absolute;
  z-index: -1;
  left: 70vw;
  top: 50vh;
  width: 400vw;
  height: 400vw;
  transform: translate(-50%, -50%);
`;

const Header = styled.header`
  position: absolute;
  right: 40vw;
  top: 50vh;
  text-align: center;
  color: #fff;
  transform: translate(0, -50%);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 3rem;
  font-weight: 400;
  line-height: 4rem;
`;

const Slogan = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2rem;
`;

const Footer = styled.footer`
  position: absolute;
  left: 80vw;
  top: 50vh;
  text-align: center;
  color: #fff;
  transform: translate(0, -50%);
`;

const Deadline = styled.div`
  font-size: 2rem;
  line-height: 3rem;
`;

const ComingSoon = styled.div`
  font-size: 1rem;
  line-height: 2rem;
`;

class Introduction extends React.Component {
  render() {
    return (
      <Container>
        <Logo name="logo" />
        <Header>
          <Title>ω bbs</Title>
          <Slogan>Next-generation Forum Platform</Slogan>
        </Header>
        <Footer>
          <Deadline>2017. 12. 31</Deadline>
          <ComingSoon>Coming Soon</ComingSoon>
        </Footer>
      </Container>
    );
  }
}

export default Introduction;
