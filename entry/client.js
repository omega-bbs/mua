import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { useStrict } from 'mobx'

import { App } from '../src'

useStrict(true)

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>,
    document.querySelector('#app'),
  )
}

render()

if (module.hot) {
  module.hot.accept('../src', render)
}
