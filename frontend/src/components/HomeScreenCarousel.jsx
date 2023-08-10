import { Carousel, Container, Stack } from 'react-bootstrap'
import Img1 from '../assets/images/carousel1.jpg'
import Img2 from '../assets/images/carousel2.jpg'
import Img3 from '../assets/images/carousel3.jpg'
import Img4 from '../assets/images/carousel4.jpg'
import Img5 from '../assets/images/carousel5.jpg'
import Img6 from '../assets/images/carousel6.jpg'
import Img7 from '../assets/images/carousel7.jpg'
import Img8 from '../assets/images/carousel8.jpg'

function HomeScreenCarousel() {
  return (
    <Container>
      <Carousel className='my-5'>
        <Carousel.Item>
          <Stack
            direction='horizontal'
            className='h-100 justify-content-center align-items-center'
          >
            <img
              src={Img1}
              alt='first slide-1'
              className='d-block mx-auto w-50'
            />
            <img
              src={Img2}
              alt='first slide-2'
              className='d-block mx-auto w-50'
            />
            <Carousel.Caption>
              <h3>Paws for Effect</h3>
              <p>
                Our furry clients put the "paw" in applause for our tail-wagging
                services
              </p>
            </Carousel.Caption>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack
            direction='horizontal'
            className='h-100 justify-content-center align-items-center'
          >
            <img
              src={Img3}
              alt='second slide-1'
              className='d-block mx-auto w-50'
            />
            <img
              src={Img4}
              alt='second slide-2'
              className='d-block mx-auto w-50'
            />
            <Carousel.Caption>
              <h3>Barking Up Fun</h3>
              <p>
                Dogs have voted - our playdates are the ultimate way to fetch
                happiness
              </p>
            </Carousel.Caption>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack
            direction='horizontal'
            className='h-100 justify-content-center align-items-center'
          >
            <img
              src={Img5}
              alt='third slide-1'
              className='d-block mx-auto w-50'
            />
            <img
              src={Img6}
              alt='third slide-2'
              className='d-block mx-auto w-50'
            />
            <Carousel.Caption>
              <h3>Sit, Stay, Play</h3>
              <p>Canine critics agree - our daycare is a howling good time</p>
            </Carousel.Caption>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack
            direction='horizontal'
            className='h-100 justify-content-center align-items-center'
          >
            <img
              src={Img7}
              alt='fourth slide-1'
              className='d-block mx-auto w-50'
            />
            <img
              src={Img8}
              alt='fourth slide-2'
              className='d-block mx-auto w-50'
            />
            <Carousel.Caption>
              <h3>Unleash the Joy</h3>
              <p>
                Join us and let your pet be the star of their own happy tail
              </p>
            </Carousel.Caption>
          </Stack>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
}

export default HomeScreenCarousel
