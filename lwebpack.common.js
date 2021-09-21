const path = require('path');

module.exports = {
  entry: {
    localhost: "./src/localhost/main.ts",
  },
  output: {
    path: path.resolve(__dirname, 'ldist/'),
  },
  target: "node",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
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
    ],
  },
}
