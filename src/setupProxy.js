const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      '/2.0/',
      {
        target: 'https://ws.audioscrobbler.com/',
        changeOrigin: true,
      }
    )
  );
}