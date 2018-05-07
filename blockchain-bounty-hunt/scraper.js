const express = require('express')
const request = require('request')
const fs = require('fs')
const app = express()

// Generate blocks for date ranges to parse through
request('https://blockchain.info/blocks/1525300000000?format=json',(req, res, body) => {
  fs.writeFileSync('./2.json', JSON.stringify(JSON.parse(body)))
})

request('https://blockchain.info/blocks/1525200000000?format=json',(req, res, body) => {
  fs.writeFileSync('./1.json', JSON.stringify(JSON.parse(body)))
})

request('https://blockchain.info/blocks/1525100000000?format=json',(req, res, body) => {
  fs.writeFileSync('./30.json', JSON.stringify(JSON.parse(body)))
})

app.listen(3000)