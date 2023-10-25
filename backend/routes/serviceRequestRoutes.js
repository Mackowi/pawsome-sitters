import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createServiceRequest,
  getPatronServiceRequests,
} from '../controllers/serviceRequestController.js'

const router = express.Router()

router.route('/').all(protect).post(createServiceRequest)
router.get('/:patronId', protect, getPatronServiceRequests)

export default router
