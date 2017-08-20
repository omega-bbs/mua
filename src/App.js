import React from 'react'
import { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import Introduction from './pages/Introduction'
import Home from './pages/Home'

injectGlobal`
  html {
    font-family: "Roboto Condensed", sans-serif;
    font-size: 16px;
  }

  body {
    margin: 0;
  }
`

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet defaultTitle="ω bbs" titleTemplate="%s - ω bbs" />
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/preview" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default App
