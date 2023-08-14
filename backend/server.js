import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import patronRoutes from './routes/patronRoutes.js'
import Patron from './models/PatronModel.js'

dotenv.config()

connectDB()

const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/patrons', patronRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline)
})
