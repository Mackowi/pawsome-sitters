import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: ['patron', 'petOwner'],
    },
    roleConfigured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
