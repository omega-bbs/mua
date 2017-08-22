import React from 'react'
import PropTypes from 'prop-types'

const uncontrollable = Component => {
  class UncontrollableComponent extends React.Component {
    static propTypes = {
      value: PropTypes.any,
      defaultValue: PropTypes.any,
      onChange: PropTypes.func,
    }

    state = {
      value: null,
    }

    isControlled() {
      return this.props.value !== undefined
    }

    handleChange = value => {
      if (this.isControlled()) {
        if (this.props.onChange) {
          this.props.onChange(value)
        }
      } else {
        this.setState({ value })
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          value={this.isControlled() ? this.props.value : this.state.value}
          onChange={this.handleChange}
        />
      )
    }
  }

  return UncontrollableComponent
}

export default uncontrollable
