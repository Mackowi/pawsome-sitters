import ServiceRequest from '../models/ServiceRequestModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

// // desc: Get all serv req
// // route: GET /api/service
// // access: Private/Admin
// const getServiceRequests = asyncHandler(async (req, res) => {
//   const servReq = await ServiceRequest.find({})
//   if (!servReq) {
//     res.status(404)
//     throw new Error('Not found any service requests')
//   }

//   res.status(200).json(servReq)
// })

// desc: Get serv req for patron
// route: GET /api/service/:patronId
// access: Private
const getPatronServiceRequests = asyncHandler(async (req, res) => {
  const servReq = await ServiceRequest.find({ patron: req.params.patronId })
  if (!servReq) {
    res.status(404)
    throw new Error('Not found any service requests')
  }

  res.status(200).json(servReq)
})

// desc: Create serv req
// route: POST /api/service
// access: Private
const createServiceRequest = asyncHandler(async (req, res) => {
  const servReqData = req.body

  // check patron's request for duplicates
  const servReqExist = await ServiceRequest.findOne(servReqData)
  if (servReqExist) {
    res.status(400)
    throw new Error('There is already request with the same data in db')
  }

  const serviceRequest = await ServiceRequest.create(servReqData)

  res.status(201).json(serviceRequest)
})

// desc: Update serv req
// route: PUT /api/service
// access: private
const updateServiceRequest = asyncHandler(async (req, res) => {
  console.log('JEBANIE')
  console.log(req.body)
  const servReqData = req.body

  // check if serv req exists
  const servReqExist = await ServiceRequest.findById(servReqData.id)
  if (!servReqExist) {
    res.status(400)
    throw new Error('Not found and service requests')
  }

  const updatedServReq = await ServiceRequest.findByIdAndUpdate(
    servReqData.id,
    servReqData,
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(200).json(updatedServReq)
})

export { createServiceRequest, getPatronServiceRequests, updateServiceRequest }
