import React from 'react'
import { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import Introduction from './pages/Introduction'

injectGlobal`
  html {
    font-family: sans-serif;
  }

  body {
    margin: 0;
  }
`

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Introduction} />
      </Switch>
    )
  }
}

export default App
