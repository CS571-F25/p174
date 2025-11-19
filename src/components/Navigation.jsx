import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path || (path === '/' && location.pathname === '/');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🌲 Discover Hong Kong Outdoors
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/trails" className={isActive('/trails') ? 'active' : ''}>
              Trails
            </Nav.Link>
            <Nav.Link as={Link} to="/sightseeing" className={isActive('/sightseeing') ? 'active' : ''}>
              Sightseeing
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className={isActive('/events') ? 'active' : ''}>
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className={isActive('/blog') ? 'active' : ''}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/safety-tips" className={isActive('/safety-tips') ? 'active' : ''}>
              Safety Tips
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, <strong>{user.username}</strong>!
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className={isActive('/login') ? 'active' : ''}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

