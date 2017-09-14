import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
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

  const content = renderToString(
    <StaticRouter location={req.url} context={router}>
      <StyleSheetManager sheet={sheet.instance}>
        <App context={{ hostname: req.hostname }} />
      </StyleSheetManager>
    </StaticRouter>,
  );

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
};
