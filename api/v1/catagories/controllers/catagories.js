import _ from 'lodash'
import catagoryService from '../services/catagories'
import responseGenerator from '../../../../middlewares/responseGenerator'

module.exports = {
  addCatagory: async (req, res) => {
    try {
      let catagory = {
        name: req.body.catagoryName,
        description: req.body.description,
        subCatagory: req.body.subCatagory
      }
      console.log({ catagory })

      const addCatagory = await catagoryService.addCatagory(catagory)

      if (addCatagory) {
        return responseGenerator.sendResponse(res, 500, 'Catagory Added Successfully')
      } else {
        return responseGenerator.sendResponse(res, 500, 'Cannot add Catagory, Something went wrong.')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot add Catagory. Something went wrong')
    }
  },

  getAllCatagories: async (req, res) => {
    try {
      const getAllCatagories = await catagoryService.getAllProducts()

      if (getAllCatagories) {
        return responseGenerator.sendResponse(res, 500, 'List of products', getAllCatagories)
      } else {
        return responseGenerator.sendResponse(res, 500, 'Cannot get Product, Something went wrong.')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get list of Products. Something went wrong')
    }
  },

  getCatagoryById: async (req, res) => {
    try {
      let catagoryId = req.params.id
      const getCatagoryById = await catagoryService.getCatagoryById(catagoryId)

      if (getCatagoryById) {
        return responseGenerator.sendResponse(res, 500, 'Catagory', getCatagoryById)
      } else {
        return responseGenerator.sendResponse(res, 500, 'Catagory Not Found !')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot get list of Catagories. Something went wrong')
    }
  },

  updateCatagory: async (req, res) => {
    try {
      let catagory = {
        name: req.body.productName,
        description: req.body.description,
        subCatagory: req.body.subCatagory
      }
      let newCatagory = _.pickBy(catagory)
      let catagoryId = req.params.id

      const isCatagoryAdded = await catagoryService.getCatagoryById(catagoryId)
      if (isCatagoryAdded) {
        const updateCatagory = await catagoryService.updateCatagory(newCatagory, catagoryId)
        if (updateCatagory) {
          return responseGenerator.sendResponse(res, 500, 'Successfully updated Catagory')
        } else {
          return responseGenerator.sendResponse(res, 500, 'Catagory Update Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'Catagory Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot update Catagory. Something went wrong')
    }
  },

  deleteCatagory: async (req, res) => {
    try {
      const catagoryId = req.params.id

      const isCatagoryAdded = await catagoryService.getCatagoryById(catagoryId)
      if (isCatagoryAdded) {
        const deleteCatagory = await catagoryService.deleteCatagory(catagoryId)
        if (deleteCatagory) {
          return responseGenerator.sendResponse(res, 500, 'Successfully deleted Catagory')
        } else {
          return responseGenerator.sendResponse(res, 500, 'Catagory delete Failed')
        }
      } else {
        return responseGenerator.sendResponse(res, 500, 'Catagory Not found')
      }
    } catch (exception) {
      console.log('excepton', exception)
      return responseGenerator.sendResponse(res, 500, 'Cannot delete Catagory. Something went wrong')
    }
  }
}
