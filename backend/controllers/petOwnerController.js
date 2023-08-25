import PetOwner from '../models/PetOwnerModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

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
  const petOwner = await PetOwner.findById({ user: req.user._id })
  if (!petOwner) {
    res.status(404)
    throw new Error('Not found any pet owner profile for this user')
  }

  res.status(200).json(petOwner)
})

// desc: Create new patron
// route: POST /api/petowners
// access: Private
const createPetOwner = asyncHandler(async (req, res) => {
  req.body.user = req.user
  const petOwnerExist = await PetOwner.findOne({ user: req.user._id })
  if (petOwnerExist) {
    res.status(400)
    throw new Error('There is already petowner created for this user')
  }

  const petOwner = await PetOwner.create(req.body)
  res.status(201).json(petOwner)
})

// desc: Update petowner
// route: POST /api/petowners
// access: Private
const updatePetOwner = asyncHandler(async (req, res) => {
  const petOwner = await PetOwner.findOne({ user: req.user._id })
  if (!petOwner) {
    res.status(400)
    throw new Error(`No patron for that user`)
  }

  const updatedPetOwner = await PetOwner.findByIdAndUpdate(
    petOwner._id,
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
