import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

Container.Group = styled.div`
  display: flex;
  padding: 0 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
`;

Container.Button = styled.div`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;

  &.active {
    color: #fff;
    background-color: #3f51b5;
  }
`;

class Toolbar extends React.Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    plugins: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  handleMouseDown = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Container onMouseDown={this.handleMouseDown}>
        {this.props.plugins
          .map(plugin => plugin.buttons)
          .filter(Boolean)
          .map((buttons, index) => (
            <Container.Group key={index}>
              {buttons.map((button, index) => (
                <Container.Button
                  key={index}
                  tabIndex={0}
                  className={
                    button.isActive &&
                    button.isActive(this.props.editorState) &&
                    "active"
                  }
                  title={button.title}
                  onClick={button.onClick}
                >
                  {button.text}
                </Container.Button>
              ))}
            </Container.Group>
          ))}
      </Container>
    );
  }
}

export default Toolbar;
