import User from '../models/UserModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// desc: Register user
// route: POST /api/users
// access: public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error(`User with email ${email} already exist`)
  }

  const user = await User.create({
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      user,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// desc: Login user
// route: POST /api/users/login
// access: public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please provide email and password')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  const isCorrect = await user.matchPassword(password)
  if (!isCorrect) {
    res.status(401)
    throw new Error('Invalid credentials')
  }

  res.status(200).json({ success: true })
})

// desc: Logout user
// route: POST /api/users/register
// access: public
const logoutUser = (req, res) => {
  res.send('logout user')
}

export { registerUser, loginUser, logoutUser }
