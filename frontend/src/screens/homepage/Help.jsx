import { Container, Col, Row, Accordion } from 'react-bootstrap'
import { FaPhoneAlt, FaRegEnvelopeOpen } from 'react-icons/fa'

function Help() {
  return (
    <Container>
      <Row className='text-center py-5'>
        <h2 className='mb-4 text-primary fw-bold'>Contact Information</h2>
        <p className='mb-md-4'>
          Our dedicated support team is available to address any issues you may
          encounter. Whether you're a pet owner or a sitter, your satisfaction
          and the well-being of your furry friends are our priorities.
        </p>
        <Col md={6} className='fw-bold text-primary fs-5'>
          <p>
            <i>
              <FaRegEnvelopeOpen className='me-2' />
            </i>
            Email: support@pawsomesitters.com
          </p>
        </Col>
        <Col md={6} className='mb-3 mb-md-4 fw-bold text-primary fs-5'>
          <p>
            <i>
              <FaPhoneAlt className='me-2' />
            </i>
            Phone: +1-800-123-4567
          </p>
        </Col>
        <p>
          Feel free to contact us during our business hours, Monday to Friday,
          9:00 AM to 6:00 PM (EST). You can also leave a message outside of
          these hours, and we'll get back to you as soon as possible.
        </p>
      </Row>
      <Row className='mb-5'>
        <h2 className='text-center pb-4 text-primary'>
          Frequently Asked Questions
        </h2>
        <Col md={6}>
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                1. How does Pawsome Sitters work?
              </Accordion.Header>
              <Accordion.Body>
                Pawsome Sitters connects pet owners with trusted caregivers for
                services like dog walking, pet sitting, and daycare. Browse
                profiles, discuss details, and book through our platform.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>
                2. How can I find a pet sitter near me?
              </Accordion.Header>
              <Accordion.Body>
                Simply enter your location and browse local sitters. You can
                filter by services, availability, and reviews to find the
                perfect match for your pet's needs.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
              <Accordion.Header>3. Are the sitters vetted?</Accordion.Header>
              <Accordion.Body>
                Yes, our sitters undergo a thorough vetting process, including
                background checks. We take your pet's safety seriously and
                ensure that caregivers meet our high standards.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='4'>
              <Accordion.Header>4. What services are offered?</Accordion.Header>
              <Accordion.Body>
                Our caregivers offer various services, including dog walking,
                pet sitting, overnight stays, and daycare. You can choose the
                services that best suit your pet's requirements.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='5'>
              <Accordion.Header>
                5. What if I have an issue with a sitter?
              </Accordion.Header>
              <Accordion.Body>
                If you encounter any issues, our support team is here to help.
                Contact us via email or phone, and we'll assist in resolving any
                problems you may have.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6}>
          <Accordion defaultActiveKey='3'>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                6. What if I need to cancel a booking?
              </Accordion.Header>
              <Accordion.Body>
                You can cancel a booking within the specified time frame
                indicated by the sitter's cancellation policy. Check the
                sitter's profile for their policy details.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>
                7. How do I communicate with my sitter?
              </Accordion.Header>
              <Accordion.Body>
                You can message sitters directly through our messaging system.
                This helps you discuss care details, routines, and any specific
                requirements.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='3'>
              <Accordion.Header>
                8. What if my pet has special needs?
              </Accordion.Header>
              <Accordion.Body>
                Many sitters are experienced in handling pets with special
                needs. You can communicate your pet's requirements with the
                sitter and ensure they're comfortable with the care.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='4'>
              <Accordion.Header>9. Can I leave reviews?</Accordion.Header>
              <Accordion.Body>
                Yes, after a service is completed, you can leave a review for
                the sitter. Your feedback helps other pet owners make informed
                decisions.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='5'>
              <Accordion.Header>10. How do I make payments?</Accordion.Header>
              <Accordion.Body>
                Payments are handled securely through our platform. When you
                book a service, you'll be prompted to enter your payment
                information. Payment is only released to the sitter after the
                service is completed.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
export default Help
