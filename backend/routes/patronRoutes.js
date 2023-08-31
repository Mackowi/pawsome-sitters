import express from 'express'
import {
  getPatronsPub,
  getPatrons,
  getPatronByUserId,
  getPatronsInArea,
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
router.get('/area', protect, getPatronsInArea)

export default router
