const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    content: "./src/content-scripts/main.ts",
    options: "./src/options/main.tsx",
    background: "./src/background/main.ts"
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
    extensions: [".ts", ".tsx", ".js"],
    fallback: {
      process: false,
      fs: false,
      os: false,
      path: false,
    },
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"},
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
    new CopyPlugin({
      patterns: [
        {from: "src/manifest.json"},
        {context: "public", from: "imgs/*"},
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'public/options.html',
      filename: 'options.html',
      chunks: ['chunk', 'options']
    }),
    new MiniCssExtractPlugin(),
  ]
}
