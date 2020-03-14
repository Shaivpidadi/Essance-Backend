import express from 'express'
import auth from './api/v1/auth/routes/auth'
import product from './api/v1/products/routes/products'
import catagory from './api/v1/catagories/routes/catagories'
import user from './api/v1/users/routes/users'

const router = express.Router()

router.use('/', auth)
router.use('/product', product)
router.use('/catagory', catagory)
router.use('/user', user)

module.exports = router
