import bcrypt from 'bcrypt'
import authService from '../services/auth'
import responseGenerator from '../../../../middlewares/responseGenerator'
import config from '../../../../config/config'

module.exports = {
  login: async (req, res) => {
    try {
      let user = {
        email: (req.body.email) ? req.body.email.toLowerCase() : '',
        password: req.body.password
      }
      let userExists = await authService.checkIfUserExists(user.email)
      if (userExists) {
        if (bcrypt.compareSync(user.password, userExists.password) === true) {
          const loginSuccess = await authService.login(user)
          return responseGenerator.sendResponse(res, 200, 'Login Successful', loginSuccess)
        } else {
          return responseGenerator.sendResponse(res, 500, 'Wrong Password')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'User Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'User signin failed. Something went wrong')
    }
  },
  register: async (req, res) => {
    try {
      const passwordHash = await bcrypt.hashSync(req.body.password, Number(config.SALT_ROUNDS))
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        countryCode: req.body.countryCode,
        country: req.body.country,
        password: passwordHash,
        isSuperAdmin: false,
        email: (req.body.email) ? req.body.email.toLowerCase() : ''
      }
      let checkIfUserExists = await authService.checkIfUserExists(user.email)
      if (checkIfUserExists === false) {
        let userRegistered = authService.registerUser(user)
        if (userRegistered) {
          return responseGenerator.sendResponse(res, 200, 'User Registered Successfully')
        } else {
          return responseGenerator.sendResponse(res, 500, 'Something went wrong')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'Email Already Exists')
      }
    } catch (exception) {
      console.log(exception)
      return responseGenerator.sendResponse(res, 500, 'User signin failed. Something went wrong')
    }
  },
  logout: async (req, res) => {
    let userId = req.authenticationId
    try {
      await authService.logout(userId, req) // remove req for single login
      return responseGenerator.sendResponse(res, 200, 'User logged out successfully')
    } catch (excepton) {
      return responseGenerator.sendResponse(res, 500, 'User logout failed. Something went wrong')
    }
  },
  changePassword: async (req, res) => {
    let user = {
      newPassword: req.body.newPassword,
      confirmPassword: req.body.confirmPassword
    }
    let userId = req.authenticationId
    try {
      let passwordChange = await authService.changePassword(userId, user)
      console.log('passwordChangepasswordChange', passwordChange)
      return responseGenerator.sendResponse(res, 200, 'Password has been changed')
    } catch (excepton) {
      console.log('excepton', excepton)
      return responseGenerator.sendResponse(res, 500, 'Changing Password failed. Something went wrong')
    }
  }
}
