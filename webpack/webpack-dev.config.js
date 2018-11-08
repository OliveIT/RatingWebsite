module.exports = require('./webpack.config.js')({
  isProduction: false,
  devtool: 'cheap-module-source-map',
  jsFileName: 'app.js',
  cssFileName: 'app.css',
  port: 37038,
});
