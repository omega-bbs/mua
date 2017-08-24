import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import clamp from "../utils/clamp";
import uncontrollable from "../utils/uncontrollable";
import Subscribe from "./Subscribe";
import Portal from "./Portal";
import Icon from "./Icon";

const EMPTY_ITEM = {
  name: null,
  value: null,
};

const VIEWPORT_PADDING = {
  HORIZONTAL: 24,
  VERTICAL: 16,
};
const MAX_HEIGHT = 320;
const TRANSITION_DURATION = 300;

const Container = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  padding-left: 0.5rem;
  cursor: pointer;
`;

Container.Text = styled.div`
  height: 2.5rem;
  line-height: 2.5rem;
`;

Container.Icon = styled(Icon)`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

Container.Popover = styled.div`
  position: absolute;
  left: -9999px;
  top: -9999px;
  overflow-y: auto;
  user-select: none;
  max-height: ${MAX_HEIGHT}px;
  margin: -0.5rem -1rem;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity ${TRANSITION_DURATION}ms;

  &:not(.entered) {
    pointer-events: none;
    opacity: 0;
  }
`;

Container.List = styled.div``;

Container.Item = styled.div`
  height: 2.5rem;
  margin: 0 -1rem;
  padding: 0 1rem;
  line-height: 2.5rem;
  cursor: pointer;
  transition: background-color 200ms;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

class Item extends React.Component {
  handleHover = () => {
    this.root.focus();
  };

  render() {
    return (
      <Container.Item
        {...this.props}
        onMouseEnter={this.handleHover}
        innerRef={node => (this.root = node)}
      />
    );
  }
}

@uncontrollable
class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    children: PropTypes.node,
  };

  state = {
    selecting: false,
  };

  getItems() {
    return React.Children.toArray(this.props.children).map(item => ({
      name: item.props.name,
      value: item.props.value,
    }));
  }

  getSelectedIndex(items = this.getItems()) {
    const index = items.findIndex(item => item.value === this.props.value);
    return index !== -1 ? index : 0;
  }

  handleClick = () => {
    const style = getComputedStyle(this.root);
    this.setState({
      selecting: true,
      style: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
      },
    });
  };

  handleItemClick = value => {
    this.setState({ selecting: false });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  handlePosition = () => {
    const index = this.getSelectedIndex();
    const item = this.list.children[index];
    const rect = this.text.getBoundingClientRect();
    const listRect = this.list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const canScroll = listRect.height > MAX_HEIGHT;
    const clampScrollOffset = scrollOffset =>
      clamp(scrollOffset, 0, listRect.height - MAX_HEIGHT);

    const resultRect = {
      left: rect.left,
      top: rect.top,
      width: listRect.width,
      height: Math.min(listRect.height, MAX_HEIGHT),
    };

    let scrollOffset = 0;
    if (canScroll) {
      scrollOffset = clampScrollOffset(
        itemRect.top - listRect.top - (resultRect.height - itemRect.height) / 2,
      );
    }

    resultRect.top -= itemRect.top - listRect.top - scrollOffset;

    const viewportRect = {
      left: VIEWPORT_PADDING.HORIZONTAL,
      right: document.documentElement.clientWidth - VIEWPORT_PADDING.HORIZONTAL,
      top: VIEWPORT_PADDING.VERTICAL,
      bottom: document.documentElement.clientHeight - VIEWPORT_PADDING.VERTICAL,
    };

    const clampedLeft = clamp(
      resultRect.left,
      viewportRect.left,
      viewportRect.right - resultRect.width,
    );
    const clampedTop = clamp(
      resultRect.top,
      viewportRect.top,
      viewportRect.bottom - resultRect.height,
    );

    if (clampedTop !== resultRect.top) {
      scrollOffset = clampScrollOffset(
        scrollOffset + (clampedTop - resultRect.top),
      );
    }

    resultRect.left = clampedLeft;
    resultRect.top = clampedTop;

    this.popover.scrollTop = scrollOffset;
    this.popover.style.left = `${window.pageXOffset + resultRect.left}px`;
    this.popover.style.top = `${window.pageYOffset + resultRect.top}px`;

    item.focus();
  };

  handleDocumentMouseDown = event => {
    if (
      !this.root.contains(event.target) &&
      !this.popover.contains(event.target)
    ) {
      this.setState({ selecting: false });
    }
  };

  render() {
    const items = this.getItems();
    const index = this.getSelectedIndex();
    const selected = items[index] || EMPTY_ITEM;
    return [
      this.state.selecting &&
        <Subscribe
          key="subscribe"
          target={() => document}
          event="mousedown"
          handler={this.handleDocumentMouseDown}
          options={{ passive: true }}
        />,
      <Container
        key="root"
        className={this.props.className}
        tabIndex={0}
        onClick={this.handleClick}
        innerRef={node => (this.root = node)}
      >
        <Container.Text innerRef={node => (this.text = node)}>
          {selected.name}
        </Container.Text>
        <Container.Icon name="drop-down" />
      </Container>,
      <Transition
        key="popover"
        in={this.state.selecting}
        timeout={TRANSITION_DURATION}
        mountOnEnter
        unmountOnExit
        onEntering={this.handlePosition}
      >
        {status =>
          <Portal>
            <Container.Popover
              className={status}
              style={this.state.style}
              innerRef={node => (this.popover = node)}
            >
              <Container.List innerRef={node => (this.list = node)}>
                {items.map(item =>
                  <Item
                    key={item.value}
                    tabIndex={0}
                    onClick={() => this.handleItemClick(item.value)}
                  >
                    {item.name}
                  </Item>,
                )}
              </Container.List>
            </Container.Popover>
          </Portal>}
      </Transition>,
    ];
  }
}

Select.Option = () => null;
Select.Option.propTypes = {
  name: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
};

export default Select;
