import express from 'express'
import { getUsers, deleteUser, getUserById, updateUserAccess, getProductListByAdmin, getProductById, updateProductDetails, deleteProduct, addProduct, getOrdersByAdmin, getOrderDetailsByAdmin, getOrderDetailsForUpdate, updateOrderStatus} from '../controllers/adminController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/users/page/:pageNumber').get(protect,admin,getUsers)
router.route('/products/page/:pageNumber').get(protect,admin,getProductListByAdmin)
router.route('/orders/page/:pageNumber').get(protect,admin,getOrdersByAdmin)

router.route('/product/:id').get(protect,admin,getProductById)
router.route('/user/:id').get(protect,admin,getUserById)
router.route('/order/:id').get(protect,admin,getOrderDetailsForUpdate)

router.route('/product/:id/edit').put(protect,admin,updateProductDetails)
router.route('/user/:id/edit').put(protect,admin,updateUserAccess)
router.route('/order/:id/edit').put(protect,admin,updateOrderStatus)

router.route('/deleteuser/:id').delete(protect,admin,deleteUser)
router.route('/deleteproduct/:id').delete(protect,admin,deleteProduct)

router.route('/addproduct').post(protect,admin,addProduct)

router.route('/view/order/:id/:name').get(protect,admin,getOrderDetailsByAdmin)

export default router