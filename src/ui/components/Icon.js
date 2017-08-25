import React from "react";
import PropTypes from "prop-types";

const req = require.context("svg-react-loader!../assets/icons", true, /\.svg$/);

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

export default Icon;
