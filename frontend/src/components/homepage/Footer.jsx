import { Container, Row, Col } from 'react-bootstrap'
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  const date = new Date().getFullYear()

  return (
    <footer className='py-3 bg-primary text-white fw-bold'>
      <Container>
        <Row className='text-center'>
          <Col className='d-flex justify-content-center gap-2 gap-md-3'>
            <p className='mb-0'>Pawsome Sitters &copy; {date}</p>
            <Link to='http://facebook.com'>
              <i>
                <FaFacebookSquare size={25} />
              </i>
            </Link>
            <Link to='http://twitter.com'>
              <i>
                <FaTwitterSquare size={25} />
              </i>
            </Link>
            <Link to='http://instagram.com'>
              <i>
                <FaInstagramSquare size={25} />
              </i>
            </Link>

            <Link to='http://youtube.com'>
              <i>
                <FaYoutubeSquare size={25} />
              </i>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
export default Footer
