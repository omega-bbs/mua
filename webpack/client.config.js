/* eslint-disable import/unambiguous */

const path = require('path')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = ({ friendly = false } = {}) => {
  const production = process.env.NODE_ENV === 'production'

  return {
    context: path.resolve('.'),

    entry: {
      app: [
        'babel-polyfill',
        'dom4',
        'react-hot-loader/patch',
        './entry/client',
      ],
    },

    output: {
      path: path.resolve('./dist/client'),
      filename: production
        ? 'assets/[name]-[chunkhash].js'
        : 'assets/[name].js',
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

      new ManifestPlugin({
        fileName: 'manifest.json',
        writeToFileEmit: true,
      }),

      friendly && new FriendlyErrorsPlugin(),
    ].filter(Boolean),

    devServer: {
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
