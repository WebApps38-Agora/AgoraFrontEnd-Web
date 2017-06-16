const resolve = require('path').resolve;

module.exports = function editWebpackConfig (webpackConfig) {
  // webpackConfig is the parsed JS webpack config from react-scrips.
  // modify it here synchronously, & return it.

  // let newResolve = {
  //       alias: {
  //         // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
  //         'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
  //         ...webpackConfig.resolve.alias
  //       },
  //       ...webpackConfig.resolve,
  // }

  return webpackConfig //{...webpackConfig, resolve: {...newResolve}}
}
