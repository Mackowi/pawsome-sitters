import { Card, Button, Row, Col, Container } from 'react-bootstrap'

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
    <Card className='p-3 border-secondary bg-primary-light border-2 message-box'>
      <h2 className='pb-1 text-primary fw-bold'>Message Box</h2>
      <Row className='text-start d-flex justify-content-center mb-1'>
        <Col>
          <div class='list-group message-box-list'>
            {messages.map((message) => (
              <>
                <a
                  href='#'
                  class='list-group-item list-group-item-action border-secondary '
                  onClick={() => messageHandler(message)}
                >
                  <div class='d-flex w-100 justify-content-between'>
                    <h5 class='mb-1'>{message.from}</h5>
                    <small>x days ago</small>
                  </div>
                  <p class='mb-1'>{message.text}</p>
                </a>
              </>
            ))}
          </div>
        </Col>
      </Row>
    </Card>
  )
}
export default MessageBox
