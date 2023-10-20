import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createServiceRequest,
  getPatronServiceRequests,
} from '../controllers/serviceRequestController.js'

const router = express.Router()

router.route('/').all(protect).post(createServiceRequest)
router.post('/patron', protect, getPatronServiceRequests)

export default router
