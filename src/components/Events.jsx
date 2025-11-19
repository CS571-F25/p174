import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap';
import { eventsData } from '../data/eventsData';

export default function Events() {
  const [events] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const getDifficultyBadge = (difficulty) => {
    if (difficulty.includes('Easy')) return <Badge bg="success">Easy</Badge>;
    if (difficulty.includes('Hard')) return <Badge bg="danger">Hard</Badge>;
    return <Badge bg="warning">Moderate</Badge>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">📅 Upcoming Events</h1>
          <p className="lead">Join outdoor events and connect with fellow enthusiasts</p>
        </Col>
      </Row>

      <Row>
        {events.map(event => (
          <Col md={6} lg={4} key={event.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={event.photo}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>
                  <Badge bg="primary">{event.type}</Badge>
                  {' '}
                  {getDifficultyBadge(event.difficulty)}
                  <br />
                  <small className="text-muted">
                    📅 {formatDate(event.date)}
                  </small>
                  <br />
                  <small className="text-muted">
                    📍 {event.location}
                  </small>
                </Card.Text>
                <Card.Text className="flex-grow-1">
                  {event.description.substring(0, 120)}...
                </Card.Text>
                <div className="mb-2">
                  <small className="text-muted">
                    👥 {event.currentParticipants}/{event.maxParticipants} participants
                  </small>
                  <div className="progress" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar" 
                      role="progressbar"
                      style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>
                <Button 
                  variant={event.registration === 'Open' ? 'success' : 'secondary'}
                  onClick={() => openEventDetails(event)}
                  disabled={event.registration !== 'Open'}
                >
                  {event.registration === 'Open' ? 'View Details' : 'Registration Closed'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedEvent.name}
                <Badge bg={selectedEvent.registration === 'Open' ? 'success' : 'secondary'} className="ms-2">
                  {selectedEvent.registration}
                </Badge>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img 
                src={selectedEvent.photo} 
                alt={selectedEvent.name}
                className="img-fluid rounded mb-3"
              />
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Type:</strong> {selectedEvent.type}</p>
                  <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  <p><strong>Difficulty:</strong> {getDifficultyBadge(selectedEvent.difficulty)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                  <p><strong>Participants:</strong> {selectedEvent.currentParticipants}/{selectedEvent.maxParticipants}</p>
                  <p><strong>Registration:</strong> 
                    <Badge bg={selectedEvent.registration === 'Open' ? 'success' : 'secondary'} className="ms-2">
                      {selectedEvent.registration}
                    </Badge>
                  </p>
                </Col>
              </Row>
              <p><strong>Description:</strong></p>
              <p>{selectedEvent.description}</p>
              {selectedEvent.registration === 'Open' && (
                <div className="alert alert-info">
                  <strong>Spots Available:</strong> {selectedEvent.maxParticipants - selectedEvent.currentParticipants} remaining
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              {selectedEvent.registration === 'Open' && (
                <Button variant="success">
                  Register Now
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

