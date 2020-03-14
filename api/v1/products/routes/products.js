import express from 'express'
import productController from '../controllers/products'
import authenticationMiddleware from '../../../../middlewares/authentication'
const router = express.Router()

router.post('/', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], productController.addProduct)
// router.get('/', authenticationMiddleware.authenticateUser, productController.getAllProducts)
router.get('/', productController.getAllProducts)
router.get('/in-stock', authenticationMiddleware.authenticateUser, productController.getInStockProducts)
router.put('/:id', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], productController.updateProduct)
router.get('/:id', authenticationMiddleware.authenticateUser, productController.getProductById)
router.delete('/:id', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], productController.deleteProduct)
module.exports = router
