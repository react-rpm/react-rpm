/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

const host = 'localhost';
const port = 3000;
const extpath = path.join(__dirname, './chrome/extension/');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devServer: { host, port, headers: { "Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Credentials": "true" } },
  entry: {
    background: [`${extpath}background`],
    devpanel: [`${extpath}devpanel`, `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`],
    devtools: [`${extpath}devtools`],
    // content: [ `${extpath}content` ],
    // page: [ `${extpath}page` ],
  },
  output: {
    path: path.join(__dirname, 'dev'),
    filename: '[name].bundle.js',
    publicPath: `http://${host}:${port}/`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        { 
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }
        }
      ],
      exclude: /node_modules/,
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }
      ]
    }, {
      test: /\.(jpg|jpeg|png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 8192,
          }
        }
      ]
    }]
  }
};
