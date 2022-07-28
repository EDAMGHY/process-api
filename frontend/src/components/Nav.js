import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navb from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { useAuthGlobalContext } from '../actions/auth';

function ColorSchemesExample() {
  const navigate = useNavigate();
  const { token, logout } = useAuthGlobalContext();
  const onLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>Process App</Navbar.Brand>
          <Navb.Collapse id='navbarScroll'>
            <Nav className='me-auto'>
              <Link className='text-secondary text-decoration-none m-2' to='/'>
                Dashboard
              </Link>
              {token ? (
                <button className='btn btn-primary border' onClick={onLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    className='text-secondary text-decoration-none  m-2'
                    to='/login'
                  >
                    Login
                  </Link>
                  <Link
                    className='text-secondary text-decoration-none  m-2'
                    to='/register'
                  >
                    Register
                  </Link>
                </>
              )}
            </Nav>
          </Navb.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
