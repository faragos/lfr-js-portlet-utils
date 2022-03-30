const bootstrapper = require('@clavis/lfr-js-portlet-bootstrapper')
const fs = require('fs')

module.exports = async function (configPath, basePath) {
  await bootstrapper(configPath, basePath)

  console.info('Starting Webpack Config')

  const config = getConfig(configPath, basePath)
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

  let headers = {}
  if (config.user && config.password) {
      headers = { 'Authorization': `Basic ${Buffer.from(config.user + ':' + config.password).toString('base64')}` }
  }
  const options = {
    headers: {
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': '*',
    },
    allowedHosts: ['all'],
    contentBase: sourcesPath + '../',
    hot: true,
    host: config.host,
    proxy: {
      '**': {
        target: config.protocol + '://' + config.host + ':' + config.port,
        router: () => config.originAbsoluteUrl,
        changeOrigin: true,
        headers: { headers }
      },
    },
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

  const fullConfigPath = basePath + '/' + configPath

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

