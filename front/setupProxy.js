<<<<<<< HEAD
const { createProxyMiddleware } = require('http-proxy-middleware');
=======
const { createProxyMiddleWare } = require('http-proxy-middleware');
>>>>>>> front-redux

module.exports = function(app) {
  app.use(
    '/api',
<<<<<<< HEAD
    createProxyMiddleware({
=======
    createProxyMiddleWare({
>>>>>>> front-redux
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};