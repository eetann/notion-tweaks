const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtensionReloader = require('./extension-reloader.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    publicPath: false
  },
  plugins: [
    new ExtensionReloader(),
  ]
});
