import express from 'express'
import {
  getPatronsPub,
  getPatrons,
  getPatronByUserId,
  createPatron,
  updatePatron,
} from '../controllers/patronController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/public', getPatronsPub)
router
  .route('/')
  .get(protect, getPatrons)
  .post(protect, createPatron)
  .put(protect, updatePatron)
router.get('/user', protect, getPatronByUserId)

export default router
