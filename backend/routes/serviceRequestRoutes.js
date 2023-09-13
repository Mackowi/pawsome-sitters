import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  getServiceRequests,
  createServiceRequest,
} from '../controllers/serviceRequestController.js'

const router = express.Router()

router
  .route('/')
  .all(protect)
  .get(getServiceRequests)
  .post(createServiceRequest)
// router.route('/:id').all(protect).get().put().delete()

export default router
