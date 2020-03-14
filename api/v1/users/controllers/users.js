import _ from 'lodash'
import userService from '../services/users'
import responseGenerator from '../../../../middlewares/responseGenerator'

module.exports = {
  getUserById: async (req, res) => {
    try {
      let userId = req.params.id
      const getUserById = await userService.getUserById(userId)

      if (getUserById) {
        return responseGenerator.sendResponse(res, 500, 'User Data', getUserById)
      } else {
        return responseGenerator.sendResponse(res, 500, 'User Not Found !')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get this User. Something went wrong')
    }
  },

  updateUser: async (req, res) => {
    try {
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        countryCode: req.body.countryCode,
        country: req.body.country,
        email: (req.body.email) ? req.body.email.toLowerCase() : ''
      }
      let newUser = _.pickBy(user)
      let userId = req.params.id

      const isUserAdded = await userService.getUserById(userId)
      if (isUserAdded) {
        const updateUser = await userService.updateUser(newUser, userId)
        if (updateUser) {
          return responseGenerator.sendResponse(res, 500, 'Successfully updated User')
        } else {
          return responseGenerator.sendResponse(res, 500, 'User Update Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'User Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot update User. Something went wrong')
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id

      const isUserAdded = await userService.getUserById(userId)
      if (isUserAdded) {
        const deleteUser = await userService.deleteUser(userId)
        if (deleteUser) {
          return responseGenerator.sendResponse(res, 500, 'Successfully deleted user')
        } else {
          return responseGenerator.sendResponse(res, 500, 'user delete Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'User Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot delete User. Something went wrong')
    }
  }
}
