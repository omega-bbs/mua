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

const render = () => {
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
  ReactDOM.hydrate(element, container);
};

render();

if (module.hot) {
  module.hot.accept(() => {
    render();
  });
}
