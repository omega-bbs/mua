/* eslint-disable import/unambiguous */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  const production = process.env.NODE_ENV === 'production'

  return {
    context: path.resolve('.'),

    entry: {
      app: [
        'babel-polyfill',
        'whatwg-fetch',
        'dom4',
        'react-hot-loader/patch',
        './app.js',
      ],
    },

    output: {
      path: path.resolve('./dist'),
      filename: production ? '[name]-[chunkhash].js' : '[name].js',
    },

    devtool: 'source-map',

    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: production,
      }),

      new webpack.EnvironmentPlugin({
        NODE_ENV: production ? 'production' : 'development',
      }),

      production && new webpack.optimize.ModuleConcatenationPlugin(),

      production &&
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
        }),

      new HtmlWebpackPlugin({
        template: './index.html',
        minify: production
          ? { collapseWhitespace: true, removeScriptTypeAttributes: true }
          : false,
        xhtml: true,
      }),
    ].filter(Boolean),
  }
}
