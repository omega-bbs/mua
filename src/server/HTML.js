import React from 'react'
import PropTypes from 'prop-types'

class HTML extends React.Component {
  static propTypes = {
    manifest: PropTypes.object.isRequired,
    helmet: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  }

  render() {
    const { manifest, helmet, content } = this.props
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=0"
          />

          {helmet.meta.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}
        </head>

        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script src={manifest['app.js']} />
        </body>
      </html>
    )
  }
}

export default HTML
