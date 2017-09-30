import React from "react";
import PropTypes from "prop-types";
import { injectGlobal } from "styled-components";
import { Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";

import FocusEffect from "./ui/components/FocusEffect";

import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";
import TopicCreator from "./pages/TopicCreator";

injectGlobal`
  html {
    min-width: calc(1200px + 2rem + 2rem);
    font-family: "Roboto Condensed", sans-serif;
    font-size: 16px;
  }

  body {
    margin: 0;
  }
`;

class App extends React.Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
  };

  render() {
    return [
      <Helmet key="helmet" defaultTitle="ω bbs" titleTemplate="%s - ω bbs" />,
      <FocusEffect key="focus" />,
      this.isPreview() && <AppHeader key="header" />,
      <div key="root">
        <Switch key={true}>
          <Route exact path="/" component={Home} />
          <Route path="/board/:board" component={Home} />
          <Route path="/topic/new" component={TopicCreator} />
        </Switch>
      </div>,
    ];
  }
}

export default App;
