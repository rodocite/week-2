const fs = require('fs')
const _ = require('lodash')

const may2 = JSON.parse(fs.readFileSync('./2.json').toString())
const may1 = JSON.parse(fs.readFileSync('./1.json').toString())
const april30 = JSON.parse(fs.readFileSync('./30.json').toString())
const h1 = _.map(may2.blocks, 'hash')
const h2 = _.map(may2.blocks, 'hash')
const h3 = _.map(may2.blocks, 'hash')

const combinedHashes = [...h1, ...h2, ...h3]

fs.writeFileSync('./blockhashes.json', JSON.stringify(combinedHashes))