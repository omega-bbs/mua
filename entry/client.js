import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { useStrict } from 'mobx'

import { App } from '../src'

useStrict(true)

const render = (hydrate = false) => {
  const container = document.querySelector('#app')
  const element = (
    <AppContainer>
      <BrowserRouter>
        <App context={{ hostname: location.hostname }} />
      </BrowserRouter>
    </AppContainer>
  )
  if (hydrate) {
    ReactDOM.hydrate(element, container)
  } else {
    ReactDOM.render(element, container)
  }
}

render(true)

if (module.hot) {
  module.hot.accept('../src', () => {
    render()
  })
}
