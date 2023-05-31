const db = require('../../config/mongoose')
const shortenURL = require('../shortenURL') // 載入shortenURL model

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  shortenURL.create({ URL: `https://tw.alphacamp.co`, transferURL: `AAAAA` })
  shortenURL.create({ URL: `https://www.youtube.com`, transferURL: `BBBBB` })
  shortenURL.create({ URL: `https://www.google.com.tw`, transferURL: `Ab2fE` })
  console.log('done')
})