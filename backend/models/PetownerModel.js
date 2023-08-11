import mongoose from 'mongoose'

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
    age: {
      type: Number,
      required: [true, 'Please add an age'],
    },
    info: {
      type: String,
      required: [true, 'Please add info '],
      maxLength: [100, 'Info can not be longer than 100 characters'],
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
      type: String,
      required: [true, 'Please add an address'],
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

const PetOwner = mongoose.model('PetOwner', PetOwnerSchema)

export default PetOwner
