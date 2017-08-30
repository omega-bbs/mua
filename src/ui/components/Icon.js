import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const req = require.context("../assets/icons", true, /\.svg$/);

const Container = styled.div`
  display: block;
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
  };

  render() {
    const name = this.props.name;
    const Icon = req(`./${name}.svg`);
    return <Icon className={this.props.className} />;
  }
}

export default Container.withComponent(Icon);
