import cron from 'node-cron'
import ServiceRequest from '../models/ServiceRequestModel.js'
import { DateTime } from 'luxon'

const setupServiceWatcher = () => {
  console.log(`Service Watcher is running`.magenta.underline)
  //  cron job that runs every minute
  cron.schedule('* * * * *', async () => {
    const now = DateTime.local()
    try {
      // Find unfulfilled service requests where the end date and time are in the past
      const unfulfilledRequests = await ServiceRequest.find({
        fulfilled: false,
        startDate: { $lt: now },
      })
      // Update the fulfilled status of the found service requests
      for (const request of unfulfilledRequests) {
        request.fulfilled = true
        await request.save()
      }
      console.log('Updated unfulfilled service requests.'.magenta.underline)
    } catch (error) {
      console.error('Error updating service requests:', error.red.underline)
    }
  })
}

export default setupServiceWatcher
