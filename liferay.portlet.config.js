module.exports = {
  protocol: 'http',
  host: 'localhost',
  originPort: 8080,
  originAbsoluteUrl: 'http://localhost:80',
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
  },
  user: 'test@liferay.com',
  password: 'test'
}
