import User from '../models/UserModel.js'
import PetOwner from '../models/PetOwnerModel.js'
import Patron from '../models/PatronModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'

// desc: Register user
// route: POST /api/users
// access: public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please provide name, email and password')
  }

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error(`User with email ${email} already exist`)
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
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
    throw new Error('Invalid credentials')
  }
  generateToken(res, user._id)
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    role: user.role,
    roleConfigured: user.roleConfigured,
  })
})

// desc: Logout user
// route: POST /api/users/logout
// access: public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({
    message: 'Logged out successfully',
  })
})

// desc: Update user
// route: PUT /api/users/update
// desc: private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (req.body.password) {
    if (await user.matchPassword(req.body.password)) {
      res.status(404)
      throw new Error('Cannot change password, existing one is the same')
    }
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  user.role = req.body.role || user.role

  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    isAdmin: updatedUser.isAdmin,
  })
})

// desc: get request user
// route: POST /api/users/getProfile
// access: public
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  let profile
  if (!user.role) {
    res.status(404)
    throw new Error('User role not assigned')
  } else {
    if (user.role === 'patron') {
      profile = await Patron.find({ user: req.user._id })
      console.log(profile)
    } else {
      profile = await PetOwner.find({ user: req.user._id })
    }
  }
  if (!profile) {
    res.status(404)
    throw new Error('User profile not found')
  }
  res.status(200).json({ profile })
})

// desc: get request user
// route: POST /api/users/getme
// access: public
const getMe = (req, res) => {
  res.send(req.user)
}

export { registerUser, loginUser, logoutUser, updateUser, getProfile, getMe }
