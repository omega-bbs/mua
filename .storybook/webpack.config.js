/* eslint-disable import/unambiguous */

const PORT = Number(process.env.API_PORT || 8000)

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: `http://127.0.0.1:${PORT}`,
        pathRewrite: { '^/api': '' },
      },
    },
  },
}
