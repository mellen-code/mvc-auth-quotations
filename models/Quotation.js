const mongoose = require('mongoose')

const QuotationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('quotes', QuotationSchema)
