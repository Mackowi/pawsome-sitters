import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  createServiceRequest,
  getPatronServiceRequests,
  getPetOwnerServiceRequests,
  updateServiceRequest,
} from '../controllers/serviceRequestController.js'

const router = express.Router()

router
  .route('/')
  .all(protect)
  .post(createServiceRequest)
  .put(updateServiceRequest)
router.get('/patron/:patronId', protect, getPatronServiceRequests)
router.get('/petowner/:petOwnerId', protect, getPetOwnerServiceRequests)

export default router
