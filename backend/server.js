import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

const port = process.env.PORT || 6000

const app = express()

app.get('/', (req, res) => {
  res.send('Backend running')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan.underline)
})
