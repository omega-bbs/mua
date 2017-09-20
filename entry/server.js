import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
  // getDataFromTree,
} from "react-apollo";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { useStrict } from "mobx";
import { useStaticRendering } from "mobx-react";

import { App } from "../src";
import { HTML } from "../src/server";

useStrict(true);
useStaticRendering(true);

const DOCTYPE = "<!DOCTYPE html>";

export default options => (req, res) => {
  const router = {};
  const sheet = new ServerStyleSheet();

  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      // TODO: use env
      uri: "http://127.0.0.1:8000/graphql",
      opts: {
        headers: {
          Cookie: req.header("Cookie"),
        },
      },
    }),
  });

  const element = (
    <StyleSheetManager sheet={sheet.instance}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={router}>
          <App context={{ hostname: req.hostname }} />
        </StaticRouter>
      </ApolloProvider>
    </StyleSheetManager>
  );

  // TODO: fetch on server
  // getDataFromTree(element).then(() => {
  const content = renderToString(element);

  const helmet = Helmet.renderStatic();

  if (router.url) {
    res.redirect(router.url);
    return;
  }

  const html =
    DOCTYPE +
    renderToStaticMarkup(
      <HTML
        options={options}
        helmet={helmet}
        sheet={sheet}
        content={content}
      />,
    );

  res.send(html);
  // });
};
