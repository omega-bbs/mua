import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

class HTML extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    helmet: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
  };

  render() {
    const { options, helmet, sheet, content } = this.props;

    const assets = options.clientStats.assetsByChunkName;
    const scripts = _.flatten([assets.vendor, assets.app])
      .filter(file => file && file.endsWith(".js"))
      .map(file => options.clientStats.publicPath + file);

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

          {scripts.map(file => (
            <link key={file} rel="preload" as="script" href={file} />
          ))}

          {helmet.meta.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}

          {sheet.getStyleElement()}
        </head>

        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: content }} />

          {scripts.map(file => <script key={file} src={file} />)}
        </body>
      </html>
    );
  }
}

export default HTML;
