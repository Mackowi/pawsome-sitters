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
router.post('/pets', protect, addPet)
router.route('/pets/:id').all(protect).put(updatePet).delete(deletePet)

export default router
