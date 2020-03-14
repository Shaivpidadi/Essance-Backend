import mongoose from 'mongoose'
mongoose.set('debug', true)

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  sizes: [String],
  catagoryId: {
    type: String
  },
  availableStock: {
    type: Number
  },
  productType: {
    type: String
  },
  gender: {
    type: String
  },
  inDisplay: {
    type: Boolean
  },
  images: {
    type: [String]
  },
  brand: {
    type: String
  },
  description: {
    type: String
  },
  colors: {
    type: [String]
  },
  oldPrice: {
    type: Number
  },
  discountPercentage: {
    type: Number
  }
}, {
  collection: 'products'
})

module.exports = mongoose.model('products', productSchema)
