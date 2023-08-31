import Patron from '../models/PatronModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import geocoder from '../utils/geocoder.js'
import calculateDistance from '../utils/calculateDistance.js'

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
// route: GET /api/patrons/area
// access: Private
const getPatronsInArea = asyncHandler(async (req, res) => {
  const { centerCoords, edgeCoords } = req.body

  const lng = centerCoords[0]
  const lat = centerCoords[1]

  // const distance = calculateDistance(lat, lng, edgeCoords[0], edgeCoords[1])

  const distance = 50

  // calculate the radius using radians
  // divide distance by radius of earth
  // Earth Radius = 6378km
  const radius = distance / 6378

  // console.log(distance)

  const patrons = await Patron.find({
    address: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  })

  res.status(200).json({ patrons })
})

// desc: Get patron profile of the user
// route: GET /api/patrons/user
// access: Private
const getPatronByUserId = asyncHandler(async (req, res) => {
  const patron = await Patron.find({ user: req.user._id })
  if (!patron) {
    res.status(404)
    throw new Error('There is not patron profile for this user')
  }

  res.status(200).json(patron)
})

// desc: Create new patron
// route: POST /api/patrons
// access: Private
const createPatron = asyncHandler(async (req, res) => {
  req.body.user = req.user._id
  const patronData = req.body
  const patronExist = await Patron.findOne({ user: req.user._id })
  if (patronExist) {
    res.status(400)
    throw new Error('There is already patron created for this user')
  }

  const patron = await Patron.create(patronData)

  res.status(201).json(patron)
})

// desc: Update patron
// route: PUT /api/patrons
// access: Private
const updatePatron = asyncHandler(async (req, res) => {
  const patron = await Patron.findOne({ user: req.user._id })
  if (!patron) {
    res.status(400)
    throw new Error(`There is not patron profile`)
  }
  const updatedPatron = await Patron.findByIdAndUpdate(patron._id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json(updatedPatron)
})

export {
  getPatronsPub,
  getPatrons,
  getPatronByUserId,
  getPatronsInArea,
  createPatron,
  updatePatron,
}
