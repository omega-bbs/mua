import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

const getShortcutText = shortcut => {
  const isMacOS =
    typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent);
  return isMacOS
    ? shortcut
        .replace(/\+/g, "")
        .replace("Command", "⌘")
        .replace("Option", "⌥")
        .replace("Shift", "⇧")
    : shortcut
        .replace(/\+/g, " + ")
        .replace("Command", "Ctrl")
        .replace("Option", "Alt");
};

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

Container.Group = styled.div`
  display: flex;
  padding: 0 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
`;

Container.Button = styled.button`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  font: inherit;
  line-height: 2.5rem;
  text-align: center;
  color: #000;
  background: none;
  cursor: pointer;

  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    cursor: default;
  }

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
    const editorState = this.props.editorState;
    return (
      <Container onMouseDown={this.handleMouseDown}>
        {this.props.plugins
          .map(plugin => plugin.buttons)
          .filter(Boolean)
          .map((buttons, index) => {
            return (
              <Container.Group key={index}>
                {buttons.map((button, index) => {
                  const disabled =
                    button.isDisabled && button.isDisabled(editorState);
                  const active =
                    button.isActive && button.isActive(editorState);
                  const shortcut = button.shortcut
                    ? getShortcutText(button.shortcut)
                    : "";
                  const title = button.title
                    ? `${button.title}${shortcut ? ` (${shortcut})` : shortcut}`
                    : "";
                  return (
                    <Container.Button
                      key={index}
                      className={classNames({ active })}
                      title={title}
                      disabled={disabled}
                      onClick={button.onClick}
                    >
                      {button.text}
                    </Container.Button>
                  );
                })}
              </Container.Group>
            );
          })}
      </Container>
    );
  }
}

export default Toolbar;
