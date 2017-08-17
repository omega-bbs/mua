import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { useStrict } from 'mobx'

import { App } from '../src'

useStrict(true)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#app'),
  )
}

render()

if (module.hot) {
  module.hot.accept('../src', render)
}
