import { Card, Row, Col } from 'react-bootstrap'
import { FaEnvelope } from 'react-icons/fa'

function MessageBox() {
  const messages = [
    {
      from: 'Joe',
      text: 'Super service man',
    },
    {
      from: 'Alice',
      text: 'Great job! Keep it up!',
    },
    {
      from: 'Bob',
      text: 'You rock!',
    },
    {
      from: 'Emily',
      text: 'Amazing work!',
    },
    {
      from: 'Alex',
      text: 'Impressive!',
    },
  ]

  const messageHandler = (message) => {
    console.log('message handler')
    console.log(`${message.text}`)
  }

  return (
    <Card className='p-3 my-2 border-secondary bg-primary-light border-2 message-box text-center'>
      <h2 className='pb-1 text-primary fw-bold'>
        <FaEnvelope className='mb-1' /> Message Box
      </h2>
      <Row className='text-start d-flex justify-content-center mb-1 '>
        <Col>
          <div className='list-group message-box-list'>
            {messages.map((message, index) => (
              <div key={index}>
                <a
                  href='#'
                  className='list-group-item list-group-item-action '
                  onClick={() => messageHandler(message)}
                >
                  <div className='d-flex w-100 justify-content-between'>
                    <h5 className='mb-1'>{message.from}</h5>
                    <small>x days ago</small>
                  </div>
                  <p className='mb-1'>{message.text}</p>
                </a>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  )
}
export default MessageBox
