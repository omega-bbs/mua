/* eslint-disable import/unambiguous */

const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = () => {
  const production = process.env.NODE_ENV === 'production'

  return {
    context: path.resolve('.'),

    entry: {
      app: ['babel-polyfill', 'dom4', 'react-hot-loader/patch', './app.js'],
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

      new CaseSensitivePathsPlugin(),

      production && new webpack.optimize.ModuleConcatenationPlugin(),

      production &&
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
        }),

      new HtmlPlugin({
        template: './index.html',
        minify: production
          ? { collapseWhitespace: true, removeScriptTypeAttributes: true }
          : false,
        xhtml: true,
      }),

      new FriendlyErrorsPlugin(),
    ].filter(Boolean),

    devServer: {
      quiet: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          pathRewrite: { '^/api': '' },
        },
      },
    },
  }
}
