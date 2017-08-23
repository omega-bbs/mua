import React from 'react'
import PropTypes from 'prop-types'

class Subscribe extends React.Component {
  static propTypes = {
    target: PropTypes.func.isRequired,
    event: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    options: PropTypes.object,
  }

  componentDidMount() {
    const target = this.props.target()
    const event = this.props.event
    const handler = this.props.handler
    const options = this.props.options
    target.addEventListener(event, handler, options)
    this.unsubscribe = () => {
      target.removeEventListener(event, handler, options)
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
