import _ from 'lodash'
import productService from '../services/products'
import responseGenerator from '../../../../middlewares/responseGenerator'

module.exports = {
  addProduct: async (req, res) => {
    try {
      let product = {
        name: req.body.productName,
        price: req.body.price,
        sizes: req.body.sizes,
        catagoryId: req.body.catagoryId,
        availableStock: req.body.availableStock,
        productType: req.body.productType || null,
        gender: req.body.gender,
        inDisplay: req.body.inDisplay,
        images: req.body.images || null,
        brand: req.body.brand,
        description: req.body.description || '',
        color: req.body.color,
        oldPrice: req.body.oldPrice,
        discountPercentage: req.body.discountPercentage
      }
      console.log({ product })

      const addProduct = await productService.addProduct(product)

      if (addProduct) {
        return responseGenerator.sendResponse(res, 500, 'Product Added Successfully')
      } else {
        return responseGenerator.sendResponse(res, 500, 'Cannot add Product, Something went wrong.')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot add Product. Something went wrong')
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const getAllProducts = await productService.getAllProducts()

      if (getAllProducts) {
        return responseGenerator.sendResponse(res, 200, 'List of products', getAllProducts)
      } else {
        return responseGenerator.sendResponse(res, 500, 'Cannot get Product, Something went wrong.')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get list of Products. Something went wrong')
    }
  },

  getInStockProducts: async (req, res) => {
    try {
      const getInStockProducts = await productService.getInStockProducts()

      if (getInStockProducts) {
        return responseGenerator.sendResponse(res, 500, 'List of Available products', getInStockProducts)
      } else {
        return responseGenerator.sendResponse(res, 500, 'Cannot get Product, Something went wrong.')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get list of Products. Something went wrong')
    }
  },

  getProductById: async (req, res) => {
    try {
      let productId = req.params.id
      const getProductById = await productService.getProductById(productId)

      if (getProductById) {
        return responseGenerator.sendResponse(res, 500, 'Product Data', getProductById)
      } else {
        return responseGenerator.sendResponse(res, 500, 'Product Not Found !')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get list of Products. Something went wrong')
    }
  },

  updateProduct: async (req, res) => {
    try {
      let product = {
        name: req.body.productName,
        price: req.body.price,
        sizes: req.body.sizes,
        catagoryId: req.body.catagoryId,
        availableStock: req.body.availableStock,
        productType: req.body.productType,
        gender: req.body.gender,
        inDisplay: req.body.inDisplay,
        images: req.body.images,
        brand: req.body.brand,
        description: req.body.description,
        color: req.body.color
      }
      let newProduct = _.pickBy(product)
      let productId = req.params.id

      const isProductAdded = await productService.getProductById(productId)
      if (isProductAdded) {
        const updateProduct = await productService.updateProduct(newProduct, productId)
        if (updateProduct) {
          return responseGenerator.sendResponse(res, 500, 'Successfully updated Product')
        } else {
          return responseGenerator.sendResponse(res, 500, 'Product Update Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'Product Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot update Product. Something went wrong')
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id

      const isProductAdded = await productService.getProductById(productId)
      if (isProductAdded) {
        const deleteProduct = await productService.deleteProduct(productId)
        if (deleteProduct) {
          return responseGenerator.sendResponse(res, 500, 'Successfully deleted Product')
        } else {
          return responseGenerator.sendResponse(res, 500, 'Product delete Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'Product Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot delete Product. Something went wrong')
    }
  }
}
