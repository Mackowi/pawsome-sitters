import mongoose from 'mongoose'

export const ReviewSchema = new mongoose.Schema(
  {
    patron: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patron',
    },
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Petowner',
    },
    serviceRequest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ServiceRequest',
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// static method to get avg rating
ReviewSchema.statics.getAverageRating = async function (patrondId) {
  const obj = await this.aggregate([
    {
      // patron is the one in the model(which is just the id), the patronId is the one we provide to the method
      $match: { patron: patrondId },
    },
    {
      $group: {
        _id: '$patron',
        avgRating: { $avg: '$rating' },
      },
    },
  ])
  try {
    const patron = await this.model('Patron').findByIdAndUpdate(patrondId, {
      avgRating: obj[0].avgRating,
    })
  } catch (error) {
    console.log(error)
  }
}

// call getAverageRating after save
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.patron)
})

// call getAverageRating after removal
ReviewSchema.pre('removed', function () {
  this.constructor.getAverageRating(this.patron)
})

// update reviewed field in serviceRequest entry
ReviewSchema.post('save', async function () {
  await this.model('ServiceRequest').findOneAndUpdate(
    { _id: this.serviceRequest },
    { $set: { reviewed: true } }
  )
  // call the getAverageRating method
  this.constructor.getAverageRating(this.patron)
})

const Review = mongoose.model('Review', ReviewSchema)

export default Review
