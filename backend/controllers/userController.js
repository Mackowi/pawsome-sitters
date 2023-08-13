import User from '../models/UserModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'

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
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      roleConfigured: user.roleConfigured,
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
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid credentials 123')
  }
  generateToken(res, user._id)
  res.status(200).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    role: user.role,
    roleConfigured: user.roleConfigured,
  })
})

// desc: Logout user
// route: POST /api/users/register
// access: public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({
    message: 'Logged out successfully',
  })
}

// desc: get request user
// route: POST /api/users/getme
// access: public
const getMe = (req, res) => {
  console.log(req.user)
  res.send(req.user)
}

export { registerUser, loginUser, logoutUser, getMe }
