const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // put babel/poly before entry so browser code can be polyfilled (needed this for async functions on front end)
  entry: ['@babel/polyfill', path.join(__dirname, 'client/index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // this one from harrison, thanks harrison
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    })
  ]
}