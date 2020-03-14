import CatagoryModel from '../../../../models/catagories'

const addCatagory = async (catagoryData) => {
  const Catagory = new CatagoryModel(catagoryData)
  try {
    let catagory = await Catagory.save(catagoryData)
    return catagory
  } catch (exception) {
    throw Error(exception)
  }
}

const updateCatagory = async (catagoryData, catagoryId) => {
  try {
    let product = await CatagoryModel.update({ '_id': catagoryId }, catagoryData, { new: true })
    return product
  } catch (exception) {
    throw Error(exception)
  }
}

const deleteCatagory = async (catagoryId) => {
  try {
    let productDeleted = await CatagoryModel.deleteOne({ '_id': catagoryId })
    return productDeleted
  } catch (exception) {
    throw Error(exception)
  }
}

const getAllCatagories = async () => {
  try {
    let allCatagories = await CatagoryModel.find()
    return allCatagories
  } catch (exception) {
    throw Error(exception)
  }
}

const getCatagoryById = async (productId) => {
  try {
    let specificCatagory = await CatagoryModel.findOne({ '_id': productId })
    return specificCatagory
  } catch (exception) {
    throw Error(exception)
  }
}

module.exports = {
  addCatagory,
  updateCatagory,
  deleteCatagory,
  getAllCatagories,
  getCatagoryById
}
