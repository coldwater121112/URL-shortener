// app.js
const express = require('express')
const exphbs = require('express-handlebars');
const generateURL = require('./generate_URL')
const shortenURL = require("./models/shortenURL")
require('./config/mongoose')


const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

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
      res.render('shorten', { originalURL: originalURL, transferURL: url.transferURL });
    })
    .catch(error => console.error(error));
});

app.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params
  shortenURL.findOne({ transferURL: shortURL })
    .then(url => {
      if (url) {
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