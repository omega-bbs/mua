import React from "react";
import PropTypes from "prop-types";

class HTML extends React.Component {
  static propTypes = {
    manifest: PropTypes.object.isRequired,
    helmet: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  };

  render() {
    const { manifest, helmet, sheet, content } = this.props;
    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta charSet="UTF-8" />
          {/*
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=0"
          />
          */}

          {helmet.meta.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}

          {sheet.getStyleElement()}
        </head>

        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
          <script src={manifest["app.js"]} />
        </body>
      </html>
    );
  }
}

export default HTML;
