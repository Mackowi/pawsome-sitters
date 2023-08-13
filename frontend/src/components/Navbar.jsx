import { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { FaSignInAlt, FaInfoCircle, FaIdCard } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function NavBar() {
  const [navOpacity, setNavOpacity] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false)

  const { userInfo } = useSelector((state) => state.user)

  useEffect(() => {
    function handleNavOpacity() {
      if (window.scrollY > 50) {
        setNavOpacity(true)
      } else {
        setNavOpacity(false)
      }
    }

    window.addEventListener('scroll', handleNavOpacity)
    return () => {
      window.removeEventListener('scroll', handleNavOpacity)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsMouseOver(true)
  }

  const handleMouseLeave = () => {
    setIsMouseOver(false)
  }

  const navbarClasses = [
    'sticky-top',
    'border-secondary',
    'border-3',
    'border-bottom',
  ]
  if (navOpacity && !isMouseOver) {
    navbarClasses.push('nav-opacity')
  } else if (navOpacity && isMouseOver) {
    navbarClasses.filter((className) => className !== 'nav-opacity')
  }

  return (
    <Navbar
      expand='lg'
      bg='primary'
      className={navbarClasses.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand className='text-uppercase brand-name'>
            <Logo height='40' /> Pawsome Sitters
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto fs-5 d-flex flex-row justify-content-between'>
            <LinkContainer to='/about'>
              <Nav.Link className='fw-bold'>
                <FaIdCard className='mx-2' />
                About Us
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/help'>
              <Nav.Link className='fw-bold'>
                <FaInfoCircle className='mx-2' />
                Help
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.email} id='email'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/logout'>
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className='fw-bold'>
                  <FaSignInAlt className='mx-2' />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar
