import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap';
import { eventsData } from '../data/eventsData';
import { useBookmarks } from '../contexts/BookmarkContext';
import ImageWithFallback from './ImageWithFallback';

export default function Events() {
  const [events] = useState(eventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

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
    // Parse date string to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">📅 Upcoming Events</h1>
          <p className="lead">Don't stay at home, join an event and have fun!</p>
        </Col>
      </Row>

      <Row>
        {events.map(event => (
          <Col md={6} lg={4} key={event.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <ImageWithFallback 
                variant="top" 
                src={event.photo}
                alt={event.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title>{event.name}</Card.Title>
                  <Button
                    variant={isBookmarked('event', event.id) ? 'warning' : 'outline-secondary'}
                    size="sm"
                    onClick={() => toggleBookmark('event', event.id)}
                  >
                    {isBookmarked('event', event.id) ? '⭐' : '☆'}
                  </Button>
                </div>
                <Card.Text>
                  <Badge bg="primary">{event.type}</Badge>
                  {' '}
                  {getDifficultyBadge(event.difficulty)}
                  <br />
                  <small className="text-muted">
                    📅 {event.date_range || formatDate(event.date)}
                  </small>
                  <br />
                  <small className="text-muted">
                    📍 {event.location}
                  </small>
                </Card.Text>
                <Card.Text className="flex-grow-1">
                  {event.description.substring(0, 120)}...
                </Card.Text>
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
              <ImageWithFallback 
                src={selectedEvent.photo} 
                alt={selectedEvent.name}
                className="img-fluid rounded mb-3"
              />
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Type:</strong> {selectedEvent.type}</p>
                  {selectedEvent.date_range ? (
                    <p><strong>Date Range:</strong> {selectedEvent.date_range}</p>
                  ) : (
                    <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
                  )}
                  {selectedEvent.time && typeof selectedEvent.time === 'string' && (
                    <p><strong>Time:</strong> {selectedEvent.time}</p>
                  )}
                  {selectedEvent.time && typeof selectedEvent.time === 'object' && (
                    <div>
                      <p><strong>Time:</strong></p>
                      <ul>
                        <li>Monday to Friday: {selectedEvent.time.monday_to_friday}</li>
                        <li>Weekends and Holidays: {selectedEvent.time.weekends_and_holidays}</li>
                      </ul>
                    </div>
                  )}
                  {selectedEvent.opening_hours && (
                    <div>
                      <p><strong>Opening Hours:</strong></p>
                      <ul>
                        {selectedEvent.opening_hours.nov_14 && (
                          <li>November 14: {selectedEvent.opening_hours.nov_14}</li>
                        )}
                        {selectedEvent.opening_hours.nov_15_to_dec_21 && (
                          <li>
                            Nov 15 - Dec 21: Mon-Fri {selectedEvent.opening_hours.nov_15_to_dec_21.monday_to_friday}, 
                            Sat-Sun {selectedEvent.opening_hours.nov_15_to_dec_21.saturday_sunday}
                          </li>
                        )}
                        {selectedEvent.opening_hours.dec_22_to_jan_4 && (
                          <li>Dec 22 - Jan 4: {selectedEvent.opening_hours.dec_22_to_jan_4}</li>
                        )}
                        {selectedEvent.opening_hours.special_days && (
                          <li>Special Days: {selectedEvent.opening_hours.special_days}</li>
                        )}
                      </ul>
                    </div>
                  )}
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  {selectedEvent.meeting_point && <p><strong>Meeting Point:</strong> {selectedEvent.meeting_point}</p>}
                  {selectedEvent.route && <p><strong>Route:</strong> {selectedEvent.route}</p>}
                  {selectedEvent.transportation && <p><strong>Transportation:</strong> {selectedEvent.transportation}</p>}
                  <p><strong>Difficulty:</strong> {getDifficultyBadge(selectedEvent.difficulty)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                  {selectedEvent.price && <p><strong>Price:</strong> {selectedEvent.price}</p>}
                  {selectedEvent.admission && <p><strong>Admission:</strong> {selectedEvent.admission}</p>}
                  {selectedEvent.group_size && <p><strong>Group Size:</strong> {selectedEvent.group_size}</p>}
                  {selectedEvent.show_frequency && <p><strong>Show Frequency:</strong> {selectedEvent.show_frequency}</p>}
                  <p><strong>Registration:</strong> 
                    <Badge bg={selectedEvent.registration === 'Open' ? 'success' : 'secondary'} className="ms-2">
                      {selectedEvent.registration}
                    </Badge>
                  </p>
                </Col>
              </Row>
              <p><strong>Overview:</strong></p>
              <p>{selectedEvent.description}</p>
              {selectedEvent.highlights && (
                <>
                  <p><strong>Highlights:</strong></p>
                  <p>{selectedEvent.highlights}</p>
                </>
              )}
              {selectedEvent.includes && (
                <>
                  <p><strong>Includes:</strong></p>
                  <p>{selectedEvent.includes}</p>
                </>
              )}
              {selectedEvent.important_notice && (
                <div className="alert alert-warning">
                  <strong>Important Notice:</strong> {selectedEvent.important_notice}
                </div>
              )}
              {selectedEvent.dress_code && (
                <div className="alert alert-info">
                  <strong>Dress Code:</strong> {selectedEvent.dress_code}
                </div>
              )}
              {selectedEvent.refund_policy && (
                <p><strong>Refund Policy:</strong> {selectedEvent.refund_policy}</p>
              )}
              {selectedEvent.contact && (
                <p><strong>Contact:</strong> {selectedEvent.contact}</p>
              )}
              {selectedEvent.category && (
                <p><strong>Category:</strong> {selectedEvent.category}</p>
              )}
              {selectedEvent.ticket_instructions && (
                <div className="alert alert-info">
                  <strong>Ticket Instructions:</strong> {selectedEvent.ticket_instructions}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={() => toggleBookmark('event', selectedEvent.id)}>
                {isBookmarked('event', selectedEvent.id) ? '⭐ Remove from Bookmarks' : '☆ Add to Bookmarks'}
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              {selectedEvent.registration === 'Open' && selectedEvent.ticket_link && (
                <Button 
                  variant="success"
                  onClick={() => window.open(selectedEvent.ticket_link, '_blank')}
                >
                  Link to Event
                </Button>
              )}
              {selectedEvent.registration === 'Open' && !selectedEvent.ticket_link && (
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
