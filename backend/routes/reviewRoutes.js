import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getReviews,
  createReview,
  getPatronReviews,
} from '../controllers/reviewController.js'

const router = express.Router()

router.get('/', protect, getReviews)
router.get('/patron/:id', protect, getPatronReviews)
router.post('/', protect, createReview)

export default router
