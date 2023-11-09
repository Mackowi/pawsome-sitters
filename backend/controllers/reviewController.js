import asyncHandler from '../middleware/asyncHandler.js'
import Review from '../models/ReviewModel.js'

// desc: Get all reviews
// route: GET /api/reviews
// access: Private
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
  if (!reviews) {
    res.status(404)
    throw new Error('Not found any reviews')
  }

  res.status(200).json(reviews)
})

// desc: Create review
// route: POST /api/reviews
// access: Private
const createReview = asyncHandler(async (req, res) => {
  const reviewData = req.body
  const reviewExist = await Review.findOne({
    serviceRequest: reviewData.serviceRequest,
  })
  if (reviewExist) {
    res.status(404)
    throw new Error('There is already review for this service request')
  }
  const review = await Review.create(reviewData)
  res.status(201).json(review)
})

// desc: Get all reviews
// route: GET /api/reviews/patron/:id
// access: Private
const getPatronReviews = asyncHandler(async (req, res) => {
  const patronId = req.params.id
  const reviews = await Review.find({patron: patronId})
  if (!reviews) {
    res.status(404)
    throw new Error('Not found any reviews')
  }

  res.status(200).json(reviews)
})

export { getReviews, createReview, getPatronReviews }
