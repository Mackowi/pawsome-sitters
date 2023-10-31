import { Button } from 'react-bootstrap'
import { useGetPetOwnerQuery } from '../../slices/petOwnersApiSlice'
import { useHandleServiceRequestMutation } from '../../slices/patronsApiSlice'
import Loader from '../../components/Loader'
import { formatDateTimeToDisplay } from '../../utils/date'
import { toast } from 'react-toastify'

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
        <div className='list-group-item list-group-item-action d-flex flex-column align-items-center'>
          <div className='d-flex w-75 justify-content-between'>
            <p className=''>
              From:{' '}
              {
                <strong>
                  {petOwner.firstName} {petOwner.lastName} {service.accepted}
                </strong>
              }
            </p>
            <div className='d-flex flex-column align-items-end'>
              <small>
                Start:{' '}
                <strong>{formatDateTimeToDisplay(service.startDate)}</strong>
              </small>
              <small>
                {' '}
                End: <strong>{formatDateTimeToDisplay(service.endDate)}</strong>
              </small>
            </div>
          </div>
          <div className='d-flex w-75 justify-content-between'>
            <div className='d-flex gap-3'>
              <p className=''>Pets:</p>
              {service.pets.map((petName) => {
                const pet = petOwner.pets.find((pet) => pet.name === petName)
                return (
                  <div key={petName} className='border border-primary'>
                    {pet && (
                      <div>
                        <p>
                          {pet.name} - {pet.type}
                        </p>
                        <p>Age: {pet.age} years</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className='d-flex gap-2'>
              <Button
                onClick={() => {
                  submitHandler(true)
                }}
              >
                Accept
              </Button>
              <Button
                variant='primary-outline'
                onClick={() => {
                  submitHandler(false)
                }}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default RequestBoxEntry
