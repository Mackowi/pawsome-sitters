import express from 'express'
import {
  getPatrons,
  getPatronById,
  getPatronByUserId,
  getPatronsInArea,
  createPatron,
  updatePatron,
} from '../controllers/patronController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .get(protect, getPatrons)
  .post(protect, createPatron)
  .put(protect, updatePatron)
router.get('/user', protect, getPatronByUserId)
router.get('/:id', protect, getPatronById)
router.post('/area', protect, getPatronsInArea)

export default router
