import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      maxlength: 20,
    },
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
      select: false,
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

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function (receivedPassword) {
  return await bcrypt.compare(receivedPassword, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User
