import express from 'express'
import {
  getPetOwners,
  createPetOwner,
  updatePetOwner,
  getPetOwnerByUserId,
  addPet,
  updatePet,
  deletePet,
} from '../controllers/petOwnerController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .all(protect)
  .get(getPetOwners)
  .post(createPetOwner)
  .put(updatePetOwner)
router.get('/user', protect, getPetOwnerByUserId)
router.route('/pets').all(protect).post(addPet).put(updatePet)
router.delete('/pets/:id', protect, deletePet)

export default router
