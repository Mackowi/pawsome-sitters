import { Container, Row, Col } from 'react-bootstrap'
import Img1 from '../../assets/images/about1.jpg'
import Img2 from '../../assets/images/about2.jpg'
import Img3 from '../../assets/images/about3.jpg'

function About() {
  return (
    <Container className=''>
      <Row className='py-5'>
        <h2 className='text-center text-secondary fw-bold mb-4 '>About Us</h2>
        <p>
          Welcome to Pawsome Sitters, where our passion for pets drives
          everything we do. We understand that pets are cherished members of the
          family, deserving the best care possible. Founded by a team of devoted
          pet lovers, Pawsome Sitters was born out of the desire to create a
          platform that connects pet owners with reliable caregivers who share
          the same love and dedication.
        </p>
        <p>
          Our mission is simple: to provide a safe, convenient, and trustworthy
          solution for all your pet care needs. We believe that every pet
          deserves a warm lap, an enthusiastic walk, and a loving environment
          when you can't be there. That's why we've built a community of
          experienced sitters who are as passionate about pets as you are.
        </p>
        <p>
          What sets Pawsome Sitters apart is our commitment to quality. We've
          implemented rigorous vetting processes to ensure that every sitter on
          our platform is trustworthy and responsible. Our Trust and Safety Team
          works tirelessly to review applications and conduct background checks,
          ensuring that your pets are in safe hands.
        </p>
        <p>
          Thank you for choosing Pawsome Sitters. Let's embark on this journey
          together, ensuring that pets everywhere receive the love, attention,
          and care they truly deserve.
        </p>
      </Row>

      <Row className='bg-secondary-light py-4 mb-4 rounded-4 px-3 '>
        <h2 className='text-center text-primary fw-bold mb-4 '>Who Are We</h2>
        <Row className='mb-4'>
          <Col md={6} className='d-flex flex-column justify-content-center'>
            <h4 className='text-primary text-center text-md-end'>
              Our Collective Passion
            </h4>
            <p className=' text-center text-md-end'>
              We're united by the goal of enhancing the lives of pets and pet
              owners alike. Pawsome Sitters is more than a service it's a
              community driven by compassion and a commitment to the well-being
              of all furry, feathered, and scaled friends.
            </p>
          </Col>
          <Col md={6}>
            <img src={Img1} alt='dog' className='img-fluid rounded-4'></img>
          </Col>
        </Row>
        <Row className='mb-4'>
          <Col
            md={6}
            className='d-flex flex-column justify-content-center order-md-2'
          >
            <h4 className='text-primary text-center text-md-start'>
              Why We Do It
            </h4>
            <p className='text-center text-md-start'>
              From wagging tails to contented purrs, the joy pets bring is
              unmatched. We're driven to ensure pets continue to spread
              happiness, while owners have peace of mind knowing their
              companions are in capable, loving hands.
            </p>
          </Col>
          <Col md={6} className='order-md-1'>
            <img src={Img2} alt='cat' className='img-fluid rounded-4'></img>
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col md={6} className='d-flex flex-column justify-content-center'>
            <h4 className='text-primary text-center text-md-end'>
              Our commitment
            </h4>
            <p className='text-center text-md-end'>
              With backgrounds spanning entrepreneurship, animal advocacy, and
              technology, we've woven a tapestry of expertise. Our commitment to
              pet welfare is unwavering, making Pawsome Sitters a testament to
              our love for all creatures great and small.
            </p>
          </Col>
          <Col md={6}>
            <img src={Img3} alt='cat' className='img-fluid rounded-4'></img>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}
export default About
