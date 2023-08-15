// provides non-html, clear response if we're hitting non-existing endpoint
// with 404 status instead of 500

const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// provides non-html response, allows us to overwrite 200 error status code
// coming from mongodb and making the answer dependent on environment
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { errorHandler, notFound }
