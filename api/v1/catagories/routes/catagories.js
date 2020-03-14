import express from 'express'
import catagoryController from '../controllers/catagories'
import authenticationMiddleware from '../../../../middlewares/authentication'
const router = express.Router()

router.post('/', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], catagoryController.addCatagory)
router.get('/', authenticationMiddleware.authenticateUser, catagoryController.getAllCatagories)
router.put('/:id', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], catagoryController.updateCatagory)
router.get('/:id', authenticationMiddleware.authenticateUser, catagoryController.getCatagoryById)
router.delete('/:id', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], catagoryController.deleteCatagory)
module.exports = router
