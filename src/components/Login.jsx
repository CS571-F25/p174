import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export default function Login() {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginForm.username || !loginForm.password) {
      setLoginError('Please fill in all fields.');
      return;
    }

    const result = login(loginForm.username, loginForm.password);
    if (result.success) {
      navigate('/');
    } else {
      setLoginError(result.error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerForm.username || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Please fill in all fields.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters long.');
      return;
    }

    const result = register(registerForm.username, registerForm.password);
    if (result.success) {
      setRegisterSuccess('Registration successful! You can now login.');
      setRegisterForm({ username: '', password: '', confirmPassword: '' });
      setTimeout(() => {
        setActiveTab('login');
        setRegisterSuccess('');
      }, 2000);
    } else {
      setRegisterError(result.error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>🌲 Welcome Back!</h2>
                <p className="text-muted">Login or create an account to continue</p>
              </div>

              <Tabs
                activeKey={activeTab}
                onSelect={(k) => {
                  setActiveTab(k || 'login');
                  setLoginError('');
                  setRegisterError('');
                  setRegisterSuccess('');
                }}
                className="mb-3"
              >
                <Tab eventKey="login" title="Login">
                  <Form onSubmit={handleLogin}>
                    {loginError && (
                      <Alert variant="danger" className="mb-3">
                        {loginError}
                      </Alert>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">
                      Login
                    </Button>
                  </Form>
                </Tab>

                <Tab eventKey="register" title="Register">
                  <Form onSubmit={handleRegister}>
                    {registerError && (
                      <Alert variant="danger" className="mb-3">
                        {registerError}
                      </Alert>
                    )}
                    {registerSuccess && (
                      <Alert variant="success" className="mb-3">
                        {registerSuccess}
                      </Alert>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Choose a username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                        required
                      />
                      <Form.Text className="text-muted">
                        Username must be unique.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter a password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                        minLength={6}
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 6 characters.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">
                      Register
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

