import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import parseProtocol from '../../utils/parseProtocol'

@inject('markdownStore')
@observer
class Media extends React.Component {
  static propTypes = {
    markdownStore: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
  }

  getFile() {
    const params = parseProtocol(this.props.src)
    if (!params || params.type !== 'file' || !params.id) {
      return null
    }
    return this.props.markdownStore.getFile(params.id)
  }

  render() {
    const file = this.getFile()
    if (!file) {
      return null
    }
    return null
  }
}

export default Media
