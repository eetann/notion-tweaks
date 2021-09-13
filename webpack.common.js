const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    content: "./src/content-scripts/main.js",
    options: "./src/options/main.js",
    background: "./src/background/main.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
  optimization: {
    splitChunks: {
      name: 'chunk',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    }
  },
  module: {
    rules: [
      ,
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin([{
      from: 'src/manifest.json',
    },
    ]),
    new MiniCssExtractPlugin(),
  ]
}
