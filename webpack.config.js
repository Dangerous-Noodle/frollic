const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const process = require('process');

module.exports = {
  // entry:[path.join(__dirname, 'client', 'index.js'), path.join(__dirname, 'client', 'style.scss')],
  mode: process.env.NODE_ENV,
  entry: {src: './client/index.js'},
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }
      },
      {
        test: /.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './client/index.html',
    })
  ],
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist'),
    },
<<<<<<< HEAD
    proxy: { '/api': 'http://localhost:3000', '/assets' : 'http://localhost:3000' }
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
=======
    proxy: { 
      '/api': 'http://localhost:3000', 
      '/auth': 'http://localhost:3000', 
      '/assets' : 'http://localhost:3000' 
    }
  }
>>>>>>> c76c5de998c8536ee05d0a2a4eea8e1481e9cc98
}