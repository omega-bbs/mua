import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

Container.Layout = styled.div`
  display: flex;
  margin: 0 -1rem;
`;

Container.Main = styled.main`
  flex: 1;
  margin: 0 1rem;
`;

Container.Sidebar = styled.aside`
  order: -1;
  width: 240px;
  margin: 0 1rem;
`;

class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <Container>
        <Container.Layout>
          {this.props.children}
        </Container.Layout>
      </Container>
    );
  }
}

PageLayout.Main = Container.Main;
PageLayout.Sidebar = Container.Sidebar;

export default PageLayout;
