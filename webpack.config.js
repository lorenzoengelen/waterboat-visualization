var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'lodash',
  'd3',
  'react-dom',
  'jquery',
  'bootstrap'
];

module.exports = {
  entry: {
    bundle: './src/index.jsx',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      { 
        loader: 'url-loader?limit=100000',
        test: /\.png$/ 
      },
      { 
        loader: 'file-loader', 
        test: /\.jpg$/ 
      },
      {
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/
      },
      {
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/
      },
      {
        loader: 'file-loader',
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/
      },
      {
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
