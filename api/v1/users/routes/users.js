import express from 'express'
import userController from '../controllers/users'
import authenticationMiddleware from '../../../../middlewares/authentication'
const router = express.Router()

router.put('/:id', authenticationMiddleware.authenticateUser, userController.updateUser)
router.get('/:id', authenticationMiddleware.authenticateUser, userController.getUserById)
router.delete('/:id', [authenticationMiddleware.authenticateUser, authenticationMiddleware.checkIfAdmin], userController.deleteUser)
module.exports = router
