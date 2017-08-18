import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useStrict } from 'mobx'
import { useStaticRendering } from 'mobx-react'
import fs from 'fs'
import yargs from 'yargs'
import Koa from 'koa'

import { App } from '../src'
import { HTML } from '../src/server'

useStrict(true)
useStaticRendering(true)

const DOCTYPE = '<!DOCTYPE html>'
const PORT = Number(yargs.argv.port)

const manifest = JSON.parse(fs.readFileSync(yargs.argv.manifest).toString())

const app = new Koa()

app.use(async ctx => {
  const router = {}
  const sheet = new ServerStyleSheet()

  const content = renderToString(
    <StaticRouter location={ctx.url} context={router}>
      <StyleSheetManager sheet={sheet.instance}>
        <App />
      </StyleSheetManager>
    </StaticRouter>,
  )

  const helmet = Helmet.renderStatic()

  if (router.url) {
    ctx.redirect(router.url)
    return
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
    )

  ctx.body = html
})

app.listen(PORT)
