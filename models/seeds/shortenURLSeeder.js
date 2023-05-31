const mongoose = require('mongoose')
const shortenURL = require('../shortenURL') // 載入shortenURL model
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
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