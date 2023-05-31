// app.js
const express = require('express')
const exphbs = require('express-handlebars');
const generateURL = require('./generate_URL')
const mongoose = require('mongoose') // 載入 mongoose

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定路由
// 首頁
app.get('/', (req, res) => {
  const transferURL = generateURL()
  // console.log(transferURL)、
  res.render('index')
})

app.listen(3000, () => {
  console.log('App is runnung on port http://localhost:3000')
})