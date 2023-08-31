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

// desc: Create new petowner
// route: POST /api/petowners
// access: Private
const createPetOwner = asyncHandler(async (req, res) => {
  req.body.user = req.user._id
  const petOwnerData = req.body
  const petOwnerExist = await PetOwner.findOne({ user: req.user._id })
  if (petOwnerExist) {
    res.status(400)
    throw new Error('There is already pet owner created for this user')
  }

  const petOwner = await PetOwner.create(petOwnerData)

  res.status(201).json(petOwner)
})

// desc: Update petowner
// route: PUT /api/petowners
// access: Private
const updatePetOwner = asyncHandler(async (req, res) => {
  const petOwner = await PetOwner.findOne({ user: req.user._id })
  if (!petOwner) {
    res.status(404)
    throw new Error(`No pet owner for that user`)
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

// desc: Add new pet
// route: POST /api/petowners/pets
// access: Private
const addPet = asyncHandler(async (req, res) => {
  const newPet = req.body
  const petOwner = await PetOwner.findOne({ user: req.user._id })
  if (!petOwner) {
    res.status(404)
    throw new Error(`No pet owner for that user`)
  }
  newPet.petOwner = petOwner._id
  petOwner.pets.push(newPet)
  await petOwner.save()
  res.status(201).json(petOwner)
})

// desc: Update pet data
// route: PUT /api/petowners/pets/:id
// access: Private
const deletePet = asyncHandler(async (req, res) => {
  const petId = req.params.id
  const petOwner = await PetOwner.findOne({ user: req.user._id })
  if (!petOwner) {
    res.status(404)
    throw new Error(`No pet owner for that user`)
  }
  const pets = petOwner.pets.filter((pet) => {
    return pet._id.toString() !== petId
  })

  petOwner.pets = pets

  await petOwner.save()

  res.status(200).json(petOwner)
})

// desc: Update pet data
// route: PUT /api/petowners/pets/:id
// access: Private
const updatePet = asyncHandler(async (req, res) => {
  const { id, type, name, gender, age, info } = req.body
  const petOwner = await PetOwner.findOne({ user: req.user._id })
  if (!petOwner) {
    res.status(404)
    throw new Error(`No pet owner for that user`)
  }

  const updatedPets = petOwner.pets.map((pet) => {
    if (pet._id.toString() === id) {
      return {
        ...pet,
        type,
        name,
        gender,
        age,
        info,
      }
    }
    return pet
  })
  petOwner.pets = updatedPets
  await petOwner.save()

  res.status(200).json(petOwner)
})

export {
  getPetOwnersPub,
  getPetOwners,
  getPetOwnerByUserId,
  createPetOwner,
  updatePetOwner,
  addPet,
  updatePet,
  deletePet,
}
