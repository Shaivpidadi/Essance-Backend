import mongoose from 'mongoose'
mongoose.set('debug', true)

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  subCatagory: {
    type: String
  }
}, {
  collection: 'catagories'
})

module.exports = mongoose.model('catagories', catagorySchema)
