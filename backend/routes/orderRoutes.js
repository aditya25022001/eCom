import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {addOrderItems, getOrderById, updateOrderToPaid} from '../controllers/orderController.js'

const router = express.Router()

router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router;