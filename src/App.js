import React from 'react'
import PropTypes from 'prop-types'
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
  static propTypes = {
    context: PropTypes.object.isRequired,
  }

  isPreview() {
    const hostname = this.props.context.hostname
    return (
      hostname === 'preview.xn--omega.com' ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1'
    )
  }

  render() {
    return (
      <div>
        <Helmet defaultTitle="ω bbs" titleTemplate="%s - ω bbs" />
        {this.isPreview()
          ? <Switch key={true}>
              <Route path="/" component={Home} />
            </Switch>
          : <Switch key={false}>
              <Route exact path="/" component={Introduction} />
            </Switch>}
      </div>
    )
  }
}

export default App
