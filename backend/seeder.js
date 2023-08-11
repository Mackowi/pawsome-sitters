import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// esmodule workaround
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//dotenv config
dotenv.config({ path: '../.env' })

// models
import User from './models/UserModel.js'
import Patron from './models/PatronModel.js'
import Petowner from './models/PetownerModel.js'
import Review from './models/ReviewModel.js'

// connect to db
mongoose.connect(process.env.MONGO_URI)

// read files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
)
const patrons = JSON.parse(
  fs.readFileSync(`${__dirname}/data/patrons.json`, 'utf-8')
)
const petowners = JSON.parse(
  fs.readFileSync(`${__dirname}/data/petowners.json`, 'utf-8')
)
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
)
const pets = JSON.parse(fs.readFileSync(`${__dirname}/data/pets.json`, 'utf-8'))

// import to db
const importData = async () => {
  try {
    await User.deleteMany()
    await Patron.deleteMany()
    await Petowner.deleteMany()
    await Review.deleteMany()

    await User.create(users)
    await Petowner.create(petowners)
    await Patron.create(patrons)
    await Review.create(reviews)

    // reviews for patrons
    for (const review of reviews) {
      const patron = await Patron.findById(review.patron)
      patron.reviews.push(review)
      await patron.save()
    }

    // pets for petowners
    for (const pet of pets) {
      const petOwner = await Petowner.findById(pet.petOwner)
      petOwner.pets.push(pet)
      await petOwner.save()
    }

    console.log('Data imported!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

// delete from db
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Patron.deleteMany()
    await Petowner.deleteMany()
    await Review.deleteMany()

    console.log('Data deleted!')
    process.exit()
  } catch (error) {
    console.log(error)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
