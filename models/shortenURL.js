const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURLSchema = new Schema({
  URL: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  transferURL: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  }
})

module.exports = mongoose.model('shortenURL', shortenURLSchema)