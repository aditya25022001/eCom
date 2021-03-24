import express from 'express'
import { getUsers, deleteUser, getUserById, updateUserAccess, getProductListByAdmin, getProductById, updateProductDetails, deleteProduct, addProduct, getOrdersByAdmin} from '../controllers/adminController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/users').get(protect,admin,getUsers)
router.route('/products').get(protect,admin,getProductListByAdmin)

router.route('/product/:id').get(protect,admin,getProductById)
router.route('/user/:id').get(protect,admin,getUserById)

router.route('/product/:id/edit').put(protect,admin,updateProductDetails)
router.route('/user/:id/edit').put(protect,admin,updateUserAccess)

router.route('/deleteuser/:id').delete(protect,admin,deleteUser)
router.route('/deleteproduct/:id').delete(protect,admin,deleteProduct)

router.route('/addproduct').post(protect,admin,addProduct)

router.route('/orders').get(protect,admin,getOrdersByAdmin)

export default router