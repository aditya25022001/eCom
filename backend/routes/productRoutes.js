import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getProductById, getProducts, addReview, getTopProducts } from '../controllers/productController.js';

const router = express.Router()

router.route('/').get(getProducts)

// make sure each route is unique
// here '/:id' and '/top' are treated same since after '/' there is only one parameter 
//therefore '/:id' must be added after /top since it involves querying with database

router.route('/top').get(getTopProducts)

router.route('/:id').get(getProductById)

router.route('/:id/review').post(protect, addReview)


export default router;
