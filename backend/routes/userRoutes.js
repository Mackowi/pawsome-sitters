import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getMe,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.put('/update', protect, updateUser)
router.get('/getme', protect, getMe)

export default router
