const fs = require('fs')
const request = require('request')
const _ = require('lodash')

const blockhashes = JSON.parse(fs.readFileSync('./blockhashes.json').toString())
let index = 0

const interval = setInterval(() => {
  const blockhash = blockhashes.pop()
  console.log('Inspecting ', blockhash)
  fs.writeFileSync('./new.json', JSON.stringify(blockhashes))

  request(`https://blockchain.info/rawblock/${blockhash}?format=json`, (req, res, body) => {
    const transactions = JSON.parse(body).tx
    const pattern = '04dfa3'
    const match = _.find(transactions, ({ hash }) => {
      console.log('---  transaction hash:' + hash)
      return pattern === hash.slice(-6)
    })

    if (match) {
      console.log('match', match)
      fs.writeFileSync('./matchedtxhash.json', JSON.stringify(match))
      clearInterval(interval)
      return
    }
  })
}, 60000)