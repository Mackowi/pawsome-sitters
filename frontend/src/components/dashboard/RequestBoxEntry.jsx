import { Col, Row, Button } from 'react-bootstrap'
import { useGetPetOwnerQuery } from '../../slices/petOwnersApiSlice'
import { useHandleServiceRequestMutation } from '../../slices/patronsApiSlice'
import Loader from '../../components/Loader'
import { formatDateTimeToDisplay } from '../../utils/date'
import { toast } from 'react-toastify'
import { FaCarrot, FaCat, FaDog } from 'react-icons/fa6'

function RequestBoxEntry({ service, refetch }) {
  const { data: petOwner, isLoading } = useGetPetOwnerQuery(service.petOwner)

  const [handleServiceRequest] = useHandleServiceRequestMutation()

  const submitHandler = async (response) => {
    try {
      await handleServiceRequest({
        id: service._id,
        accepted: response,
      })
      toast.success('Request accepted')
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Col className='list-group-item list-group-item-action p-3 p-md-4 request-box border-primary border-2'>
          <Row className='gap-2'>
            <div className='d-flex justify-content-around align-items-center'>
              <p>
                From:{' '}
                {
                  <strong>
                    {petOwner.firstName} {petOwner.lastName} {service.accepted}
                  </strong>
                }
              </p>
              <div className='d-flex align-items-center gap-2'>
                <p className='mb-0'>Pets:</p>
                <div className='d-flex gap-3 align-items-center flex-column flex-md-row'>
                  {service.pets.map((petName) => {
                    const pet = petOwner.pets.find(
                      (pet) => pet.name === petName
                    )
                    return (
                      <div
                        key={petName}
                        className='border border-primary border-3 p-2 rounded-2'
                      >
                        {pet && (
                          <div
                            className='d-flex gap-2 mx-2 align-items-center fw-bold'
                            key={petName}
                          >
                            {pet.type === 'dog' ? (
                              <FaDog />
                            ) : pet.type === 'cat' ? (
                              <FaCat />
                            ) : (
                              <FaCarrot />
                            )}
                            <p className='mb-0'>{pet.name}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className='d-flex flex-column '>
              <small>
                Beginning:{' '}
                <strong>{formatDateTimeToDisplay(service.startDate)}</strong>
              </small>
              <small>
                {' '}
                End: <strong>{formatDateTimeToDisplay(service.endDate)}</strong>
              </small>
            </div>
            <div className='d-flex justify-content-around justify-content-md-around'>
              <Button
                className='fw-bold w-md-25'
                onClick={() => {
                  submitHandler(true)
                }}
              >
                Accept
              </Button>
              <Button
                className='btn btn-outline-primary fw-bold w-md-25 border-3'
                variant='primary-outline'
                onClick={() => {
                  submitHandler(false)
                }}
              >
                Decline
              </Button>
            </div>
          </Row>
          <div className='d-flex w-75 justify-content-between'></div>
        </Col>
      )}
    </>
  )
}
export default RequestBoxEntry
