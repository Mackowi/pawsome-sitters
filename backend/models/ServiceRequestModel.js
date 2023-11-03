import mongoose from 'mongoose'
import { DateTime } from 'luxon'

const ServiceRequestSchema = new mongoose.Schema({
  petOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  patron: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  service: {
    type: String,
    required: [true, 'Please pick a service'],
    enum: ['walking', 'sitting', 'daycare'],
  },
  startDate: {
    type: String,
    required: [true, 'Please pick start date'],
  },
  endDate: {
    type: String,
    required: [true, 'Please pick end date'],
  },
  duration: {
    type: String,
  },
  pets: [
    {
      type: String,
      required: [true, 'Please pick a pet(s)'],
    },
  ],
  accepted: {
    type: Boolean,
  },
  fulfilled: {
    type: Boolean,
  },
  reviewed: {
    type: Boolean,
  },
})

ServiceRequestSchema.pre('save', function (next) {
  const startDateTime = DateTime.fromISO(this.startDate)
  const endDateTime = DateTime.fromISO(this.endDate)

  if (this.service === 'sitting') {
    // Calculate the number of full days
    const daysDifference = endDateTime.diff(startDateTime).as('days')
    const correctedDifference = Math.floor(daysDifference + 1)
    this.duration = correctedDifference
  } else {
    // Calculate the difference in hours
    const hoursDifference = endDateTime.diff(startDateTime).as('hours')
    this.duration = hoursDifference
  }
  next()
})

const ServiceRequest = mongoose.model('ServiceRequest', ServiceRequestSchema)

export default ServiceRequest
