import mongoose from 'mongoose'
import geocoder from '../utils/geocoder.js'

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
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      street: {
        type: String,
        required: [true, 'Please fill a street name'],
      },
      houseNr: {
        type: String,
        required: [true, 'Please fill a house Nr'],
      },
      addition: {
        type: String,
      },
      city: {
        type: String,
        required: [true, 'Please fill a city'],
      },
      postcode: {
        type: String,
        required: [true, 'Please fill a postcode'],
      },
    },
    phone: {
      type: String,
      required: [true, 'Please fill a phone number'],
      maxLength: [20, 'Phone number can not be longer than 20 characters'],
    },
    image: {
      type: String,
      // required: true,
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
  },
  { timestamps: true }
)

PatronSchema.pre('save', async function (next) {
  const addressString = `${this.address.street} ${this.address.houseNr}${this.address.addition} ${this.address.city} ${this.address.postcode}`
  const loc = await geocoder.geocode(addressString)
  this.address = {
    ...this.address,
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
  }
  next()
})

PatronSchema.pre('findOneAndUpdate', async function (next) {
  if (!this._update.address) {
    return
  }
  const addressString = `${this._update.address.street} ${this._update.address.houseNr}${this._update.address.addition} ${this._update.address.city} ${this._update.address.postcode}`
  try {
    const location = await geocoder.geocode(addressString)
    this._update.address = {
      ...this._update.address,
      type: 'Point',
      coordinates: [location[0].longitude, location[0].latitude],
    }
  } catch (error) {
    return next(error)
  }
  next()
})

PatronSchema.statics.countRatings = async function (patron) {
  try {
    const length = patron.reviews.length
    patron.ratingCount = length
    await patron.save()
  } catch (error) {
    console.log(error)
  }
}

// call get average cost after save
PatronSchema.post('save', function () {
  this.constructor.countRatings(this)
})

// call get average cost after removal
PatronSchema.pre('removed', function () {
  this.constructor.countRatings(this)
})

const Patron = mongoose.model('Patron', PatronSchema)

export default Patron
