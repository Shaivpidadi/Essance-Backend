import ProductModel from '../../../../models/products'

const addProduct = async (productData) => {
  const Product = new ProductModel(productData)
  try {
    let product = await Product.save(productData)
    return product
  } catch (exception) {
    throw Error(exception)
  }
}

const updateProduct = async (productData, productId) => {
  try {
    let product = await ProductModel.update({ '_id': productId }, productData, { new: true })
    return product
  } catch (exception) {
    throw Error(exception)
  }
}

const deleteProduct = async (productId) => {
  try {
    let productDeleted = await ProductModel.deleteOne({ '_id': productId })
    return productDeleted
  } catch (exception) {
    throw Error(exception)
  }
}

const getAllProducts = async () => {
  try {
    let allProjects = await ProductModel.find()
    return allProjects
  } catch (exception) {
    throw Error(exception)
  }
}

const getInStockProducts = async () => {
  try {
    let allAvailableProjects = await ProductModel.find({ $or: [ { 'availableStock': 0 }, { 'inDisplay': false } ] })
    console.log({ allAvailableProjects })
    return allAvailableProjects
  } catch (exception) {
    throw Error(exception)
  }
}

const getProductById = async (productId) => {
  try {
    let specificProject = await ProductModel.findOne({ '_id': productId })
    return specificProject
  } catch (exception) {
    throw Error(exception)
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getInStockProducts
}
