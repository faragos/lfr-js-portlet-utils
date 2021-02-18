var parameters = require('cwd/.webpack/parameters.json')
var main = require('mainFn')

parameters.forEach(function (entry) {
  console.log(entry)
  main.default(JSON.parse(entry.content))
})