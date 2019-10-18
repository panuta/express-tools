const path = require('path');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = (env = {}) => {
  const isDevelopment = process.env.NODE_ENV !== 'production';

  const entries = ['./client/index.js'];
  const plugins = [
    new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify((isDevelopment) ? 'development' : 'production') }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      showErrors: true
    })
  ];

  if (isDevelopment) {
    entries.unshift('webpack-hot-middleware/client?reload=true');
    plugins.unshift(new Webpack.HotModuleReplacementPlugin());
  }

  return {
    entry: entries,
    mode: (isDevelopment) ? 'development' : 'production',
    output: {
      path: OUTPUT_PATH,
      filename: 'express-tools.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: (isDevelopment) ? ['react-hot-loader/babel'] : []
          }
        },
        { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
        { test: /(\.css)$/, loaders: ['style-loader', 'css-loader?sourceMap'] }
      ]
    },
    plugins: plugins,
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
    }
  };
};
