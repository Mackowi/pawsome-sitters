import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const port = process.env.PORT || 6000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline)
})
