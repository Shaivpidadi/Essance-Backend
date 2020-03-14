import responseGenerator from './responseGenerator'
import UserModel from '../models/users'
const authenticateUser = async (req, res, next) => {
  let bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined' && bearerHeader !== '') {
    let bearer = bearerHeader.split(' ')
    let bearerToken = bearer[1]
    if (!bearerToken) {
      return responseGenerator.sendResponse(res, 405, 'No token provided')
    } else {
      let user = await UserModel.findOne({ 'accessToken': bearerToken }).lean()
      if (user) {
        req.authenticationId = user._id
        req.user = user
        req.authToken = bearerToken // new line added for multi login support
        next()
      } else {
        return responseGenerator.sendResponse(res, 405, 'Invalid access token')
      }
    }
  } else {
    return responseGenerator.sendResponse(res, 405, 'No token provided')
  }
}

const checkIfAdmin = async (req, res, next) => {
  console.log('Check Role ->', req.user)
  if (req.user.isSuperAdmin === true) {
    next()
  } else {
    return responseGenerator.sendResponse(res, 405, 'Not Authorized to perform this action')
  }
}

module.exports = {
  authenticateUser,
  checkIfAdmin
}