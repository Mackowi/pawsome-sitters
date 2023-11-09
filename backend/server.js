import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import colors from 'colors'
import path from 'path'
import connectDB from './db.js'
import cookieParser from 'cookie-parser'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import patronRoutes from './routes/patronRoutes.js'
import petOwnerRoutes from './routes/petOwnerRoutes.js'
import serviceRequestRoutes from './routes/serviceRequestRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import setupServiceWatcher from './utils/serviceWatcher.js'

connectDB()
setupServiceWatcher()

const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/patrons', patronRoutes)
app.use('/api/petowners', petOwnerRoutes)
app.use('/api/service', serviceRequestRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/reviews', reviewRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline)
})
