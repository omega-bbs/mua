import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { useStrict } from "mobx";
import { useStaticRendering } from "mobx-react";
import path from "path";
import fs from "fs";
import yargs from "yargs";
import Koa from "koa";
import serve from "koa-static";

import { App } from "../src";
import { HTML } from "../src/server";

useStrict(true);
useStaticRendering(true);

const DOCTYPE = "<!DOCTYPE html>";

const argv = yargs.argv;
const PORT = Number(argv.port);
const MANIFEST = path.resolve(argv.manifest);
const STATIC = path.resolve(argv.static);

const manifest = JSON.parse(fs.readFileSync(MANIFEST).toString());

const app = new Koa();

app.use(serve(STATIC));

app.use(async ctx => {
  const router = {};
  const sheet = new ServerStyleSheet();

  const content = renderToString(
    <StaticRouter location={ctx.url} context={router}>
      <StyleSheetManager sheet={sheet.instance}>
        <App context={{ hostname: ctx.hostname }} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const helmet = Helmet.renderStatic();

  if (router.url) {
    ctx.redirect(router.url);
    return;
  }

  const html =
    DOCTYPE +
    renderToStaticMarkup(
      <HTML
        manifest={manifest}
        helmet={helmet}
        sheet={sheet}
        content={content}
      />,
    );

  ctx.body = html;
});

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line no-console
    console.log(`Served at 127.0.0.1:${PORT}.`);
  }
});
