module.exports = {
  protocol: 'http',
  host: 'localhost',
  originPort: 8080,
  port: 3000,
  remove: {
    script: [],
    selector: '[id^=js-portlet-] + script'
  },
  initCall: {
    selector: '[id^=js-portlet-] + script',
    id: 'portletElementId'
  },
  sources: {
    js: '/src/index.js'
  }
}