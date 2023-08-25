import express from 'express'
import {
  getPetOwnersPub,
  getPetOwners,
  createPetOwner,
  updatePetOwner,
  getPetOwnerByUserId,
} from '../controllers/petOwnerController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getPetOwners).post(protect, createPetOwner)
router.route('/').put(protect, updatePetOwner)
router.get('/public', getPetOwnersPub)
router.get('/user', protect, getPetOwnerByUserId)

export default router
