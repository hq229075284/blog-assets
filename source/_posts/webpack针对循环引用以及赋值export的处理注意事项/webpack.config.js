const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [require.resolve('./src/index.js'),require.resolve('./src/a.js')],
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}