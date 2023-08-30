import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  })

  res.cookie('jwt', token, {
    // specifying whether or not the cookies should be accessible via JavaScript in the browser. This setting is forced to true,
    // because it ensures that any cross-site scripting attacks (XSS) are impossible. We don't have to worry about the development
    // environment here as this setting does not have a dependency on SSL or any other browser features.
    httpOnly: true,
    // only true for production
    secure: process.env.NODE_ENV !== 'development',
    // prevents attacks
    sameSite: 'strict',
    // same as expiresIn in token creation
    maxAge: 1000 * 60 * 180,
  })
}

export default generateToken
