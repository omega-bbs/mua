import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'

import uncontrollable from '../utils/uncontrollable'
import Subscribe from './Subscribe'
import Portal from './Portal'

const EMPTY_ITEM = {
  name: null,
  value: null,
}

const TRANSITION_DURATION = 300

const Container = styled.div`
  height: 2.5rem;
  line-height: 2.5rem;
  cursor: pointer;
`

Container.Text = styled.div``

Container.Popover = styled.div`
  position: absolute;
  margin: -0.5rem -1rem;
  padding: 0.5rem 0;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: opacity ${TRANSITION_DURATION}ms;

  &:not(.entered) {
    opacity: 0;
  }
`

Container.List = styled.div``

Container.Item = styled.div`
  height: 2.5rem;
  padding: 0 1rem;
  line-height: 2.5rem;
  cursor: pointer;
  transition: background-color 200ms;

  &:focus {
    outline: none;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

class Item extends React.Component {
  handleHover = () => {
    this.root.focus()
  }

  render() {
    return (
      <Container.Item
        {...this.props}
        onMouseEnter={this.handleHover}
        innerRef={node => (this.root = node)}
      />
    )
  }
}

@uncontrollable
class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.node,
  }

  state = {
    selecting: false,
  }

  getItems() {
    return React.Children.toArray(this.props.children).map(item => ({
      name: item.props.name,
      value: item.props.value,
    }))
  }

  getSelectedIndex(items = this.getItems()) {
    const index = items.findIndex(item => item.value === this.props.value)
    return index !== -1 ? index : 0
  }

  handleClick = () => {
    const style = getComputedStyle(this.root)
    this.setState({
      selecting: true,
      style: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
      },
    })
  }

  handleItemClick = value => {
    this.setState({ selecting: false })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handlePosition = () => {
    const index = this.getSelectedIndex()
    const item = this.list.children[index]
    const rect = this.root.getBoundingClientRect()
    const listRect = this.list.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const left = rect.left
    const top = rect.top + (listRect.top - itemRect.top)
    this.popover.style.left = `${left}px`
    this.popover.style.top = `${top}px`
    item.focus()
  }

  handleDocumentClick = event => {
    if (
      !this.root.contains(event.target) &&
      !this.popover.contains(event.target)
    ) {
      this.setState({ selecting: false })
    }
  }

  render() {
    const items = this.getItems()
    const index = this.getSelectedIndex()
    const selected = items[index] || EMPTY_ITEM
    return [
      <Subscribe
        key="subscribe"
        target={() => document}
        event="click"
        handler={this.handleDocumentClick}
      />,
      <Container
        key="root"
        className={this.props.className}
        onClick={this.handleClick}
        innerRef={node => (this.root = node)}
      >
        <Container.Text>
          {selected.name}
        </Container.Text>
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
    ]
  }
}

Select.Option = () => null
Select.Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Select
