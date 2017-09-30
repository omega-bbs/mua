import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { useStrict } from "mobx";

import { App } from "../src";

useStrict(true);

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "/api/graphql",
    opts: { credentials: "include" },
  }),
});

const render = (hydrate = false) => {
  const container = document.querySelector("#app");
  const element = (
    <AppContainer>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App context={{}} />
        </BrowserRouter>
      </ApolloProvider>
    </AppContainer>
  );
  if (hydrate) {
    ReactDOM.hydrate(element, container);
  } else {
    ReactDOM.render(element, container);
  }
};

render(true);

if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}
