const parameters = require('cwd/.webpack/parameters.json')
const main = require('mainFn')

parameters.forEach(entry => {
  console.log(entry)
  main.default(JSON.parse(entry.content))
})