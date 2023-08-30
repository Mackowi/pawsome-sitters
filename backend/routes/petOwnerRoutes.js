import express from 'express'
import {
  getPetOwnersPub,
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
router.route('/pets/:id').all(protect).delete(deletePet)

export default router
