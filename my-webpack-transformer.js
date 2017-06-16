const resolve = require('path').resolve;
const webpack = require('webpack');

// my-webpack-transformer.js
module.exports = function editWebpackConfig (webpackConfig) {
  // webpackConfig is the parsed JS webpack config from react-scrips.
  // modify it here synchronously, & return it.
  return webpackConfig
}
