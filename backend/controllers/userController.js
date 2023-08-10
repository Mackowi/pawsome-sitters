// desc: Register user
// route: POST /api/users
// access: public
const registerUser = (req, res) => {
  res.send('register user')
}

// desc: Login user
// route: POST /api/users/login
// access: public
const loginUser = (req, res) => {
  res.send('login user')
}

// desc: Logout user
// route: POST /api/users/register
// access: public
const logoutUser = (req, res) => {
  res.send('logout user')
}

export { registerUser, loginUser, logoutUser }
