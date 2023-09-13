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
  recurring: {
    type: Boolean,
    required: [true, 'Please specify recurrence'],
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
})

ServiceRequestSchema.pre('save', function (next) {
  const startDateTime = DateTime.fromISO(this.startDate)
  const endDateTime = DateTime.fromISO(this.endDate)
  if (this.recurring) {
    const startHours = startDateTime.hour
    const startMinutes = startDateTime.minute
    const endHours = endDateTime.hour
    const endMinutes = endDateTime.minute
    this.duration = endHours - startHours + (endMinutes - startMinutes) / 60
  } else {
    const daysDifference = endDateTime.diff(startDateTime).as('days')
    const correctedDifference = Math.floor(daysDifference + 1)
    this.duration = correctedDifference
  }
  next()
})

const ServiceRequest = mongoose.model('ServiceRequest', ServiceRequestSchema)

export default ServiceRequest
