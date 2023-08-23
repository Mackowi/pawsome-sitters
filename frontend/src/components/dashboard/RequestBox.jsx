import { Card, Row, Col, Button } from 'react-bootstrap'
import { FaPersonCircleQuestion } from 'react-icons/fa6'

function RequestBox() {
  const services = [
    {
      fullName: 'Joe Smith',
      serivce: 'sitting',
      date: '3.02.2023',
    },
    {
      fullName: 'Alice Johnson',
      serivce: 'sitting, walking',
      date: '12.03.2023',
    },
    {
      fullName: 'Bob Anderson',
      serivce: 'sitting',
      date: '16.06.2023',
    },
    {
      fullName: 'Emily Davis',
      serivce: 'sitting, walking',
      date: '6.02.2023',
    },
    {
      fullName: 'Alex Wilson',
      serivce: 'sitting',
      date: '3.02.2023',
    },
    {
      fullName: 'Alice Johnson',
      serivce: 'daycare',
      date: '26.05.2023',
    },
    {
      fullName: 'Bob Anderson',
      serivce: 'daycare',
      date: '1.06.2023',
    },
    {
      fullName: 'Emily Davis',
      serivce: 'sitting, walking',
      date: '23.03.2023',
    },
    {
      fullName: 'Alex Wilson',
      serivce: 'walking',
      date: '13.01.2023',
    },
  ]
  return (
    <Card className='p-3 my-2 border-primary bg-secondary-light border-2 request-box text-center'>
      <h2 className='pb-1 text-primary fw-bold'>
        <FaPersonCircleQuestion className='mb-2' /> Service Requests
      </h2>
      <Row className='text-start d-flex justify-content-center mb-1 '>
        <Col>
          <div className='list-group request-box-list'>
            {services.map((service, index) => (
              <div key={index}>
                <a href='#' className='list-group-item list-group-item-action '>
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{service.fullName}</h5>
                    <small>{service.date}</small>
                  </div>
                  <div className='d-flex w-100 justify-content-between'>
                    <p className='mb-1'>{service.serivce}</p>
                    <div className='d-flex gap-2'>
                      <Button>Accept</Button>
                      <Button variant='secondary'>Decline</Button>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  )
}
export default RequestBox
