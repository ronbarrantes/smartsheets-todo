'use strict';

require('dotenv').config();

const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: `${__dirname}/src/main.js`,
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.[hash].js',
    path: `${__dirname}/build`,
  },
  plugins: [
    new HTMLPlugin({
      title: 'SmartSheet ToDo',
      template: `${__dirname}/src/index.html`,
    }),
    new ExtractPlugin('bundle.[hash].css'),
    new DefinePlugin({
      __API_URL__: JSON.stringify(process.env.API_URL),
      __ACCESS_TOKEN__: JSON.stringify(process.env.ACCESS_TOKEN),
      __SHEET_ID__: JSON.stringify(process.env.SHEET_ID),
      __APP_SECRET__: JSON.stringify(process.env.APP_SECRET),
      __APP_CLIENT__: JSON.stringify(process.env.APP_CLIENT),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract({
          use: [
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [`${__dirname}/src/style`],
              },
            },
          ],
        }),
      },
    ],
  },
};
