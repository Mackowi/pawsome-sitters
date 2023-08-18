import Patron from '../models/PatronModel.js'
import User from '../models/UserModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// desc: Get all patrons
// route: GET /api/patrons/public
// access: Public
const getPatronsPub = asyncHandler(async (req, res) => {
  const patrons = await Patron.find(
    {},
    {
      address: 0,
      phone: 0,
      gender: 0,
      reviews: 0,
      acceptedPets: 0,
      service: 0,
      avgRating: 0,
      ratingCount: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  )
  if (!patrons) {
    res.status(404)
    throw new Error('Not found any patrons')
  }

  res.status(200).json(patrons)
})

// desc: Get all patrons
// route: GET /api/patrons
// access: Private
const getPatrons = asyncHandler(async (req, res) => {
  const patrons = await Patron.find({})
  if (!patrons) {
    res.status(404)
    throw new Error('Not found any patrons')
  }

  res.status(200).json(patrons)
})

// desc: Get patron profile of the user
// route: GET /api/patrons/user
// access: Private
const getPatronByUserId = asyncHandler(async (req, res) => {
  const patron = await Patron.find({ user: req.user._id })
  if (!patron) {
    res.status(404)
    throw new Error('Not found patron profile for this user')
  }

  res.status(200).json(patron)
})

// desc: Create new patron
// route: POST /api/patrons
// access: Private
const createPatron = asyncHandler(async (req, res) => {
  req.body.user = req.user
  const patronExist = await Patron.findOne({ user: req.user._id })
  if (patronExist) {
    res.status(400)
    throw new Error('There is already patron created for this user')
  }

  const patron = await Patron.create(req.body)
  res.status(201).json(patron)
})

// desc: Update patron
// route: POST /api/patrons/:id
// access: Private
const updatePatron = asyncHandler(async (req, res) => {
  const patronId = req.params.id
  const patron = await Patron.findById(patronId)
  if (!patron) {
    res.status(400)
    throw new Error(`No patron with the id: ${patronId}`)
  }

  const updatedPatron = await Patron.findByIdAndUpdate(patronId, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json(updatedPatron)
})

export {
  getPatronsPub,
  getPatrons,
  getPatronByUserId,
  createPatron,
  updatePatron,
}
