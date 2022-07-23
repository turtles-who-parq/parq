require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: ['url-loader?limit=100000', 'img-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
  devServer: {
    historyApiFallback: true,

    port: 8080,
    static: {
      directory: path.resolve(__dirname, './public'),
      publicPath: '/',
    },
    open: true,
    hot: true,
    liveReload: true,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
        secure: false,
      },
      '/assets': {
        target: `http://localhost:${process.env.PORT}`,
        secure: false,
      },
    },
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};
