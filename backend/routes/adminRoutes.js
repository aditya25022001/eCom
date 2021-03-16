import express from 'express'
import { getUsers, deleteUser } from '../controllers/userController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/users').get(protect,admin,getUsers)
router.route('/deleteuser/:id').delete(protect,admin,deleteUser)

export default router