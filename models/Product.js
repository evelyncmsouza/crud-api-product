const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  name: String,
  barCode: Number,
  price: Number,
  category: String,
  composition: String,
  quantityInStock: Number,
  weight: Number,
  heightDimension: Number,
  widthDimension: Number,
  lengthDimension: Number,
})

module.exports = Product