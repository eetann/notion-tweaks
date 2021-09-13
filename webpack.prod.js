const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ZipPlugin = require('zip-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        terserOptions: {
          output: {
            ascii_only: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new ZipPlugin({
      filename: path.basename(__dirname) + ".zip",
      pathPrefix: path.basename(__dirname)
    }),
  ]
});
