import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import Patron from './models/PatronModel.js'

dotenv.config()

connectDB()

const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.get('/api/patrons', async (req, res) => {
  const patrons = await Patron.find({})
  res.status(200).json(patrons)
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline)
})
