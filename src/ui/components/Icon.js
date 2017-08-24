import React from "react";
import PropTypes from "prop-types";

class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
  };

  render() {
    const name = this.props.name;
    const Icon = require(`svg-react-loader!../assets/icons/${name}.svg`);
    return <Icon className={this.props.className} />;
  }
}

export default Icon;
