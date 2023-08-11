import mongoose from 'mongoose'

const PatronSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    gender: {
      type: String,
      required: [true, 'Please pick a gender'],
      enum: ['male', 'female'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    phone: {
      type: String,
      required: [true, 'Please fill a phone number'],
      maxLength: [20, 'Phone number can not be longer than 20 characters'],
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Please add description '],
      maxLength: [300, 'Info can not be longer than 100 characters'],
    },
    acceptedPets: [
      {
        type: String,
        required: [true, 'Please pick a accepted pets'],
        enum: ['dog', 'cat', 'rabbit'],
      },
    ],
    service: [
      {
        type: String,
        required: [true, 'Please fill an offered service'],
        enum: ['walking', 'sitting', 'daycare'],
      },
    ],
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    ratingCount: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
)

const Patron = mongoose.model('Patron', PatronSchema)

export default Patron
