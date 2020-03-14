import UserModel from '../../../../models/users'

const updateUser = async (userData, userId) => {
  try {
    let user = await UserModel.update({ '_id': userId }, userData, { new: true })
    return user
  } catch (exception) {
    throw Error(exception)
  }
}

const deleteUser = async (userId) => {
  try {
    let userDeleted = await UserModel.deleteOne({ '_id': userId })
    return userDeleted
  } catch (exception) {
    throw Error(exception)
  }
}

const getUserById = async (userId) => {
  try {
    let specificUser = await UserModel.findOne({ '_id': userId })
    return specificUser
  } catch (exception) {
    throw Error(exception)
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUserById
}
