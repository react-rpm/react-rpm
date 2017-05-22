var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000', 
    // WebpackDevServer host and port
    'webpack/hot/only-dev-server', 
    // "only" prevents reload on syntax errors
    './app/devpanel/index.js',
  ],
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'devpanel.bundle.js',
    publicPath: `http://localhost:3000/`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
      use: ['style-loader', 'css-loader?modules'],
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
      test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader", options: {
                sourceMap: true
            }
        }, {
            loader: "sass-loader", options: {
                sourceMap: true
            }
        }]
    }, {
      test: /\.(jpg|jpeg|png)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 8192,
          }
        }
      ],
    }]
  }
};
