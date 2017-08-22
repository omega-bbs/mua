import React from 'react'
import PropTypes from 'prop-types'

class Subscribe extends React.Component {
  static propTypes = {
    target: PropTypes.func.isRequired,
    event: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const target = this.props.target()
    const event = this.props.event
    const handler = this.props.handler
    target.addEventListener(event, handler)
    this.unsubscribe = () => {
      target.removeEventListener(event, handler)
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return null
  }
}

export default Subscribe
