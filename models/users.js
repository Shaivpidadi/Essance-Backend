import mongoose from 'mongoose'
mongoose.set('debug', true)

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userProfileImage: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  countryCode: {
    type: Number
  },
  country: {
    type: String
  },
  contactNo: {
    type: Number
  },
  password: {
    type: String,
    select: false
  },
  isSuperAdmin: {
    type: Boolean
  },
  // For single login
  // accessToken:{
  //   type:String
  // }
  accessToken: [String], // multi login
  emailVerified: {
    type: Boolean
  },
  emailVerificationToken: {
    type: String
  },
  forgetPasswordVerificationTokenExpiry: {
    type: Number
  },
  forgetPasswordVerificationToken: {
    type: String
  },
  isDeleted: {
    type: Boolean
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('users', userSchema)
