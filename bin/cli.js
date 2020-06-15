#!/usr/bin/env node

var main = require('../start')
const args = process.argv.slice(2)
var config = args[0]

main(config, process.cwd())