import PetOwner from '../models/PetOwnerModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
console.log(PetOwner)

// desc: Get all pet owners
// route: GET /api/petowners/public
// access: Public
const getPetOwnersPub = asyncHandler(async (req, res) => {
  const petOwners = await PetOwner.find(
    {},
    {
      address: 0,
      phone: 0,
    }
  )
  if (!petOwners) {
    res.status(404)
    throw new Error('Not found any pet owners')
  }

  res.status(200).json(petOwners)
})

// desc: Get all pet owners
// route: GET /api/petowners
// access: Private
const getPetOwners = asyncHandler(async (req, res) => {
  const petOwners = await PetOwner.find({})
  if (!petOwners) {
    res.status(404)
    throw new Error('Not found any pet owners')
  }

  res.status(200).json(petOwners)
})

// desc: Get pet owner profile of the user
// route: GET /api/petowners/user
// access: Private
const getPetOwnerByUserId = asyncHandler(async (req, res) => {
  const patron = await PetOwner.findById({ user: req.user._id })
  if (!patron) {
    res.status(404)
    throw new Error('Not found any pet profile for this user')
  }

  res.status(200).json(patron)
})

// desc: Create new patron
// route: POST /api/petowners
// access: Private
const createPetOwner = asyncHandler(async (req, res) => {
  req.body.user = req.user
  const patronExist = await PetOwner.findOne({ user: req.user._id })
  if (patronExist) {
    res.status(400)
    throw new Error('There is already patron created for this user')
  }

  const patron = await PetOwner.create(req.body)
  res.status(201).json(patron)
})

// desc: Update patron
// route: POST /api/petowners/:id
// access: Private
const updatePetOwner = asyncHandler(async (req, res) => {
  const petOwnerId = req.params.id
  const patron = await PetOwner.findById(petOwnerId)
  if (!patron) {
    res.status(400)
    throw new Error(`No patron with the id: ${petOwnerId}`)
  }

  const updatedPetOwner = await PetOwner.findByIdAndUpdate(
    petOwnerId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedPetOwner)
})

export {
  getPetOwnersPub,
  getPetOwners,
  getPetOwnerByUserId,
  createPetOwner,
  updatePetOwner,
}
