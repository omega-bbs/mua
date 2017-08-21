import React from 'react'
import PropTypes from 'prop-types'
import { unstable_createPortal as createPortal } from 'react-dom'

class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = { mounted: false }

  target = null

  componentDidMount() {
    this.setState({ mounted: true })
  }

  getTarget() {
    if (!this.target) {
      this.target = document.createElement('div')
      document.body.appendChild(this.target)
    }
    return this.target
  }

  render() {
    if (!this.state.mounted) {
      return null
    }
    return createPortal(this.props.children, this.getTarget())
  }
}

export default Portal
