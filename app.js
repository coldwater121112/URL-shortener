// app.js
const express = require('express')
const exphbs = require('express-handlebars');
const generateURL = require('./generate_URL')
const mongoose = require('mongoose') // 載入 mongoose
const shortenURL = require("./models/shortenURL")

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

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// 設定路由
// 首頁
app.get("/", (req, res) => {
  res.render('index')
})

app.post("/", (req, res) => {
  if (!req.body.url) {
    res.redirect("/");
  }
  const originalURL = req.body.url;
  const transferURL = generateURL();
  console.log(req.body.url);
  console.log(req.headers);

  shortenURL.findOne({ URL: originalURL })
    .lean()
    .then(url => {
      if (url) {
        return url;
      } else {
        return shortenURL.create({ URL: originalURL, transferURL: transferURL });
      }
    })
    .then(url => {
      console.log("AAA", url.transferURL);
      res.render('shorten', { originalURL: originalURL, transferURL: url.transferURL });
    })
    .catch(error => console.error(error));
});


app.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params
  console.log(shortURL)
  shortenURL.findOne({ transferURL: shortURL })
    .then(url => {
      if (url) {
        console.log(url)
        res.redirect(url.URL)
      } else {
        console.log('Short URL not found')
        res.status(404).send('Short URL not found')
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).send('Internal Server Error')
    })
})


app.listen(3000, () => {
  console.log('App is runnung on port http://localhost:3000')
})