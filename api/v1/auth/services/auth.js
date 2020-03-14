import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from '../../../../models/users'
import config from '../../../../config/config'

module.exports = {
  registerUser: async (userData) => {
    const User = new UserModel(userData)
    try {
      let user = await User.save(userData)
      return user
    } catch (exception) {
      throw Error(exception)
    }
  },

  checkIfUserExists: async (userEmail) => {
    try {
      let user = await UserModel.findOne({ email: userEmail }).select('+password')
      if (user) {
        return user
      } else {
        return false
      }
    } catch (exception) {
      console.log(exception)
      throw Error(exception)
    }
  },

  login: async (userData) => {
    try {
      const userExists = await UserModel.findOne({ email: userData.email })
      const accessToken = jwt.sign({ stakeholderId: userExists._id }, 'secretkey')

      await UserModel.updateOne({ _id: userExists._id }, {
        $push: {
          accessToken: accessToken
        }
      })

      return accessToken
    } catch (exception) {
      console.log(exception)
      throw Error(exception)
    }
  },

  logout: async (stakeholderId, req) => {
    try {
      // for single login
      // await stakeholderModel.updateOne({ _id: stakeholderId }, { $set: { 'accessToken': '' } })
      await UserModel.updateOne({ _id: stakeholderId }, { $pull: { accessToken: req.authToken } })
    } catch (exception) {
      throw Error(exception)
    }
  },
  changePassword: async (userId, user) => {
    let password = await bcrypt.hashSync(user.newPassword, config.SALT_ROUNDS)
    console.log('password', password)
    try {
      let passwordUpdated = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { password: password } })
      return passwordUpdated
    } catch (exception) {
      console.log('exception', exception)
      throw Error(exception)
    }
  }
}
