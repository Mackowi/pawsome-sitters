import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createServiceRequest,
  getPatronServiceRequests,
  updateServiceRequest,
} from '../controllers/serviceRequestController.js'

const router = express.Router()

router
  .route('/')
  .all(protect)
  .post(createServiceRequest)
  .put(updateServiceRequest)
router.get('/:patronId', protect, getPatronServiceRequests)

export default router
