import express from 'express'
import Aututhentication from '../controllers/auth'
import AuthenticationMiddleware from '../../../../middlewares/authentication'
const router = express.Router()

router.post('/login', Aututhentication.login)
router.post('/registration', Aututhentication.register)
router.post('/change-password', AuthenticationMiddleware.authenticateUser, Aututhentication.changePassword)
router.post('/logout', AuthenticationMiddleware.authenticateUser, Aututhentication.changePassword)

module.exports = router
