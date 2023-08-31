import mongoose from 'mongoose'
import geocoder from '../utils/geocoder.js'

const PetSchema = new mongoose.Schema(
  {
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Petowner',
    },
    type: {
      type: String,
      required: [true, 'Please choose a pet type'],
      enum: ['dog', 'cat', 'rabbit'],
    },
    name: {
      type: String,
      required: true,
      maxLength: [25, 'Name can not be more than 25 characters'],
    },
    gender: {
      type: String,
      required: [true, 'Please pick a gender'],
      enum: ['male', 'female'],
    },
    age: {
      type: Number,
      required: [true, 'Please add an age'],
    },
    info: {
      type: String,
      maxLength: [200, 'Info can not be longer than 200 characters'],
    },
  },
  { timestamps: true }
)

const PetOwnerSchema = new mongoose.Schema(
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
    address: {
      houseNr: {
        type: String,
        required: [true, 'Please fill a house Nr'],
      },
      addition: {
        type: String,
      },
      street: {
        type: String,
        required: [true, 'Please fill a street name'],
      },
      city: {
        type: String,
        required: [true, 'Please fill a city'],
      },
      postcode: {
        type: String,
        required: [true, 'Please fill a postcode'],
      },
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
    },
    phone: {
      type: String,
      required: [true, 'Please fill a phone number'],
      maxLength: [20, 'Phone number can not be longer than 20 characters'],
    },
    pets: [PetSchema],
  },
  { timestamps: true }
)

PetOwnerSchema.pre('save', async function (next) {
  const addressString = `${this.address.street} ${this.address.houseNr}${this.address.addition} ${this.address.city} ${this.address.postcode}`
  const loc = await geocoder.geocode(addressString)
  this.address = {
    ...this.address,
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
  }
  next()
})

PetOwnerSchema.pre('findOneAndUpdate', async function (next) {
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

const PetOwner = mongoose.model('PetOwner', PetOwnerSchema)

export default PetOwner
