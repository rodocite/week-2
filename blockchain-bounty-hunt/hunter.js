const fs = require('fs')
const request = require('request')
const _ = require('lodash')

const blockhashes = JSON.parse(fs.readFileSync('./blockhashes.json').toString())
let index = 0

setInterval(() => {
  console.log('Inspecting ', blockhashes[index])

  request(`https://blockchain.info/rawblock/${blockhashes[index]}?format=json`, (req, res, body) => {
    const transactions = JSON.parse(body).tx
    const pattern = '04dfa3'
    const match = _.find(transactions, ({ hash }) => pattern === hash.slice(-6))

    if (match) {
      console.log('match', match)
      fs.writeFileSync('./matchedtxhash', match)
    }
  })

  index++
}, 10000)