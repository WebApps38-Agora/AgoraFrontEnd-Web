const resolve = require('path').resolve;

module.exports = function editWebpackConfig (webpackConfig) {
  // webpackConfig is the parsed JS webpack config from react-scrips.
  // modify it here synchronously, & return it.

  let res = webpackConfig.resolve
  let alias = webpackConfig.resolve.alias
  let a = { alias: Object.assign(
            alias,
            {'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')})
  }
  let r = { resolve: Object.assign(res, a) }
  let newResolve = Object.assign(
        webpackConfig,
        r
      )

  return newResolve
}
