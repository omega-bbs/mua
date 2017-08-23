import React from 'react'
import { injectGlobal } from 'styled-components'

import Subscribe from './Subscribe'

injectGlobal`
  :focus {
    outline: none;
  }

  html[data-focus-method="keyboard"] :focus {
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.5);
  }
`

class FocusEffect extends React.Component {
  currentMethod = null

  componentDidMount() {
    this.setMethod('pointer')
  }

  setMethod(method) {
    if (method !== this.currentMethod) {
      this.currentMethod = method
      document.documentElement.dataset.focusMethod = method
    }
  }

  handlePointerEvent = () => {
    this.setMethod('pointer')
  }

  handleKeyboardEvent = event => {
    if (event.keyCode === 9) {
      this.setMethod('keyboard')
    }
  }

  render() {
    return [
      <Subscribe
        key="pointer"
        target={() => document}
        event="pointerdown"
        handler={this.handlePointerEvent}
        options={{ passive: true }}
      />,
      <Subscribe
        key="keyboard"
        target={() => document}
        event="keydown"
        handler={this.handleKeyboardEvent}
        options={{ passive: true }}
      />,
    ]
  }
}

export default FocusEffect
