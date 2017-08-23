import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import FocusEffect from './ui/components/FocusEffect'

import Introduction from './pages/Introduction'
import Home from './pages/Home'

injectGlobal`
  html {
    min-width: calc(1200px + 2rem + 2rem);
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
      process.env.NODE_ENV !== 'production' ||
      hostname === 'preview.xn--omega.com'
    )
  }

  render() {
    return [
      <Helmet key="helmet" defaultTitle="ω bbs" titleTemplate="%s - ω bbs" />,
      <FocusEffect key="focus" />,
      <div key="root">
        {this.isPreview()
          ? <Switch key={true}>
              <Route path="/" component={Home} />
            </Switch>
          : <Switch key={false}>
              <Route exact path="/" component={Introduction} />
            </Switch>}
      </div>,
    ]
  }
}

export default App
