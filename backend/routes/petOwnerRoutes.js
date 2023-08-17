import express from 'express'
import {
  getPetOwnersPub,
  getPetOwners,
  getPetOwnerById,
  createPetOwner,
  updatePetOwner,
} from '../controllers/petOwnerController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getPetOwners).post(protect, createPetOwner)
router.route('/:id').get(protect, getPetOwnerById).put(protect, updatePetOwner)
router.get('/public', getPetOwnersPub)

export default router
