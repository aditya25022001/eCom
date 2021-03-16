import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getMyOrders } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/:id').get(protect, getUserProfile)
router.route('/profile').get(protect,  getUserProfile)
router.route('/profile').put(protect, updateUserProfile)
router.route('/profile/orders').get(protect,  getMyOrders)

export default router;