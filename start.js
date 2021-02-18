let bootstrapper = require('@clavis/lfr-js-portlet-bootstrapper')
let fs = require('fs')

module.exports = async function (configPath, basePath) {
  await bootstrapper(configPath, basePath)

  console.info('Starting Webpack Config')

  let config = getConfig(configPath, basePath)

  const sourcesPath = basePath + config.sources.js

  if (!fs.existsSync(sourcesPath)) {
    console.error(sourcesPath + ' sourcesPath' + ' not Found')
    return
  }

  const webpackDevServer = require('webpack-dev-server')
  const webpack = require('webpack')

  const webpackConfig = require('./webpack.config.js')
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    LIFERAY_USER: JSON.stringify(config.user),
    LIFERAY_PASSWORD: JSON.stringify(config.password),
  }))
  webpackConfig.entry.push(process.cwd() + config.sources.js)
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

  let finalConfig
  const defaultConfig = require(__dirname + '/' + configPath)
  if (fs.existsSync(fullConfigPath)) {
    const userConfig = require(fullConfigPath)
    finalConfig = {...defaultConfig, ...userConfig}
  } else {
    console.info(fullConfigPath + ' not Found')
    console.info('using config from ./' + configPath)
    finalConfig = defaultConfig
  }

  return finalConfig
}

