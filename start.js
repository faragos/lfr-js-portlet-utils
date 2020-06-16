let bootstrapper = require('@clavis/lfr-js-portlet-bootstrapper')
var fs = require('fs')

module.exports = function (configPath, basePath) {
  bootstrapper(configPath, basePath)

  let config = getConfig(configPath, basePath)

  const sourcesPath = basePath + config.sources.js

  if (!fs.existsSync(sourcesPath)) {
    console.error(sourcesPath + ' sourcesPath' + ' not Found')
    return
  }

  const webpackDevServer = require('webpack-dev-server')
  const webpack = require('webpack')

  const webpackConfig = require('./webpack.config.js')
  webpackConfig.resolve.alias.mainFn = sourcesPath
  const options = {
    contentBase: sourcesPath + '../',
    hot: true,
    host: config.host,
    proxy: {
      '**': {
        target: config.protocol + '://' + config.host + ':' + config.originPort,
      }
    }
  }

  webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
  const compiler = webpack(webpackConfig)
  const server = new webpackDevServer(compiler, options)

  server.listen(config.port, config.host, () => {
    console.log('dev server listening on port ' + config.port)
  })

}

function getConfig (configPath, basePath) {
  if (!configPath) {
    configPath = 'liferay.portlet.config.js'
  }

  let fullConfigPath = basePath + '/' + configPath

  if (!fs.existsSync(fullConfigPath)) {
    console.info(fullConfigPath + ' not Found')
    console.info('using config from ./' + configPath)
    return require(__dirname + '/' + configPath)
  }

  return require(fullConfigPath)
}

