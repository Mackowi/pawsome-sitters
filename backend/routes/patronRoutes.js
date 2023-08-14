import express from 'express'
import {
  getPatronsPub,
  getPatrons,
  getPatronById,
  createPatron,
  updatePatron,
} from '../controllers/patronController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getPatrons).post(protect, createPatron)
router.route('/:id').get(protect, getPatronById).put(protect, updatePatron)
router.get('/public', getPatronsPub)

export default router
