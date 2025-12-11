import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge, Tabs, Tab } from 'react-bootstrap';
import { trailsData } from '../data/trailsData';
import { sightseeingData } from '../data/sightseeingData';
import { eventsData } from '../data/eventsData';
import { Link } from 'react-router';
import { useBookmarks } from '../contexts/BookmarkContext';
import { useAuth } from '../contexts/AuthContext';
import ImageWithFallback from './ImageWithFallback';

export default function Bookmarked() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isBookmarked, toggleBookmark, getAllBookmarks } = useBookmarks();
  const { user } = useAuth();

  const allBookmarks = getAllBookmarks();
  const bookmarkedTrails = trailsData.filter(trail => isBookmarked('trail', trail.id));
  const bookmarkedSightseeing = sightseeingData.filter(spot => isBookmarked('sightseeing', spot.id));
  const bookmarkedEvents = eventsData.filter(event => isBookmarked('event', event.id));

  const openDetails = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return null;
    if (difficulty.includes('Easy')) return <Badge bg="success">Easy</Badge>;
    if (difficulty.includes('Hard')) return <Badge bg="danger">Hard</Badge>;
    return <Badge bg="warning">Moderate</Badge>;
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Island': return '🏝️';
      case 'Beach': return '🏖️';
      case 'Viewpoint': return '🌄';
      default: return '📍';
    }
  };

  const renderTrailCard = (trail) => (
    <Col md={6} lg={4} key={trail.id} className="mb-4">
      <Card className="h-100 shadow-sm">
      <ImageWithFallback variant="top" src={trail.image} alt={trail.name} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title>{trail.name}</Card.Title>
            <Button
              variant="warning"
              size="sm"
              onClick={() => toggleBookmark('trail', trail.id)}
            >
              ⭐
            </Button>
          </div>
          <Card.Text>
            <Badge bg={trail.difficulty === 'Easy' ? 'success' : trail.difficulty === 'Moderate' ? 'warning' : 'danger'}>
              {trail.difficulty}
            </Badge>
            {' '}
            <Badge bg="info">{trail.estimated_time_hours} hrs</Badge>
            <br />
            <small className="text-muted">
              📍 {trail.location} • 🕐 {trail.length_km} km • ⛰️ {trail.elevation_gain_m} m
            </small>
          </Card.Text>
          <Card.Text className="flex-grow-1">{trail.description.substring(0, 120)}...</Card.Text>
          <Button variant="success" onClick={() => openDetails(trail, 'trail')}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderSightseeingCard = (spot) => (
    <Col md={6} lg={4} key={spot.id} className="mb-4">
      <Card className="h-100 shadow-sm">
        <ImageWithFallback variant="top" src={spot.photo} alt={spot.name} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title>
              {getTypeIcon(spot.type)} {spot.name}
              <Badge bg="info" className="ms-2">{spot.type}</Badge>
            </Card.Title>
            <Button
              variant="warning"
              size="sm"
              onClick={() => toggleBookmark('sightseeing', spot.id)}
            >
              ⭐
            </Button>
          </div>
          <Card.Text>
            <small className="text-muted">
              📍 {spot.location} • 🕐 {spot.duration} • ⭐ {spot.rating}
            </small>
          </Card.Text>
          <Card.Text className="flex-grow-1">{spot.description.substring(0, 120)}...</Card.Text>
          <Button variant="success" onClick={() => openDetails(spot, 'sightseeing')}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderEventCard = (event) => (
    <Col md={6} lg={4} key={event.id} className="mb-4">
      <Card className="h-100 shadow-sm">
        <ImageWithFallback variant="top" src={event.photo} alt={event.name} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title>{event.name}</Card.Title>
            <Button
              variant="warning"
              size="sm"
              onClick={() => toggleBookmark('event', event.id)}
            >
              ⭐
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
          <Card.Text className="flex-grow-1">{event.description.substring(0, 120)}...</Card.Text>
          <Button variant="success" onClick={() => openDetails(event, 'event')}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );

  const renderModal = () => {
    if (!selectedItem || !selectedType) return null;

    if (selectedType === 'trail') {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.name}</Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <ImageWithFallback src={selectedItem.image} alt={selectedItem.name} className="img-fluid rounded mb-3" />
            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Location:</strong> {selectedItem.location}</p>
                {selectedItem.chinese_name && <p><strong>Chinese Name:</strong> {selectedItem.chinese_name}</p>}
                <p><strong>Difficulty:</strong> 
                  <Badge bg={selectedItem.difficulty === 'Easy' ? 'success' : selectedItem.difficulty === 'Moderate' ? 'warning' : 'danger'} className="ms-2">
                    {selectedItem.difficulty}
                  </Badge>
                </p>
                <p><strong>Route Type:</strong> {selectedItem.route_type}</p>
              </Col>
              <Col md={6}>
                <p><strong>Estimated Time:</strong> {selectedItem.estimated_time_hours} hours</p>
                <p><strong>Length:</strong> {selectedItem.length_km} km ({selectedItem.length_miles} miles)</p>
                <p><strong>Elevation Gain:</strong> {selectedItem.elevation_gain_m} m ({selectedItem.elevation_gain_ft} ft)</p>
                <p><strong>Rating:</strong> ⭐ {selectedItem.rating}/5.0 ({selectedItem.reviews_count} reviews)</p>
              </Col>
            </Row>
            <p><strong>Description:</strong></p>
            <p>{selectedItem.description}</p>
            <p><strong>Top Sights:</strong></p>
            <ul>
              {selectedItem.top_sights.map((sight, idx) => (
                <li key={idx}><strong>{sight.name}</strong> - {sight.type}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => toggleBookmark('trail', selectedItem.id)}>
              ⭐ Remove from Bookmarks
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </>
      );
    }

    if (selectedType === 'sightseeing') {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedItem.name}
              <Badge bg="info" className="ms-2">{selectedItem.type}</Badge>
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <ImageWithFallback src={selectedItem.photo} alt={selectedItem.name} className="img-fluid rounded mb-3" />
            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Type:</strong> {selectedItem.type}</p>
                <p><strong>Location:</strong> {selectedItem.location}</p>
                <p><strong>District:</strong> {selectedItem.district}</p>
              </Col>
              <Col md={6}>
                <p><strong>Duration:</strong> {selectedItem.duration}</p>
                <p><strong>Best Time:</strong> {selectedItem.bestTime}</p>
                <p><strong>Rating:</strong> ⭐ {selectedItem.rating}/5.0</p>
              </Col>
            </Row>
            <p><strong>Description:</strong></p>
            <p>{selectedItem.description}</p>
            <p><strong>Highlights:</strong></p>
            <ul>
              {selectedItem.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
            <p><strong>Transport:</strong> {selectedItem.transport}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => toggleBookmark('sightseeing', selectedItem.id)}>
              ⭐ Remove from Bookmarks
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </>
      );
    }

    if (selectedType === 'event') {
      return (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedItem.name}
              <Badge bg={selectedItem.registration === 'Open' ? 'success' : 'secondary'} className="ms-2">
                {selectedItem.registration}
              </Badge>
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
            <ImageWithFallback src={selectedItem.photo} alt={selectedItem.name} className="img-fluid rounded mb-3" />
            <Row className="mb-3">
              <Col md={6}>
                <p><strong>Type:</strong> {selectedItem.type}</p>
                {selectedItem.date_range ? (
                  <p><strong>Date Range:</strong> {selectedItem.date_range}</p>
                ) : (
                  <p><strong>Date:</strong> {formatDate(selectedItem.date)}</p>
                )}
                {selectedItem.time && typeof selectedItem.time === 'string' && (
                  <p><strong>Time:</strong> {selectedItem.time}</p>
                )}
                {selectedItem.time && typeof selectedItem.time === 'object' && (
                  <div>
                    <p><strong>Time:</strong></p>
                    <ul>
                      <li>Monday to Friday: {selectedItem.time.monday_to_friday}</li>
                      <li>Weekends and Holidays: {selectedItem.time.weekends_and_holidays}</li>
                    </ul>
                  </div>
                )}
                {selectedItem.opening_hours && (
                  <div>
                    <p><strong>Opening Hours:</strong></p>
                    <ul>
                      {selectedItem.opening_hours.nov_14 && (
                        <li>November 14: {selectedItem.opening_hours.nov_14}</li>
                      )}
                      {selectedItem.opening_hours.nov_15_to_dec_21 && (
                        <li>
                          Nov 15 - Dec 21: Mon-Fri {selectedItem.opening_hours.nov_15_to_dec_21.monday_to_friday}, 
                          Sat-Sun {selectedItem.opening_hours.nov_15_to_dec_21.saturday_sunday}
                        </li>
                      )}
                      {selectedItem.opening_hours.dec_22_to_jan_4 && (
                        <li>Dec 22 - Jan 4: {selectedItem.opening_hours.dec_22_to_jan_4}</li>
                      )}
                      {selectedItem.opening_hours.special_days && (
                        <li>Special Days: {selectedItem.opening_hours.special_days}</li>
                      )}
                    </ul>
                  </div>
                )}
                <p><strong>Location:</strong> {selectedItem.location}</p>
                {selectedItem.meeting_point && <p><strong>Meeting Point:</strong> {selectedItem.meeting_point}</p>}
                {selectedItem.route && <p><strong>Route:</strong> {selectedItem.route}</p>}
                {selectedItem.transportation && <p><strong>Transportation:</strong> {selectedItem.transportation}</p>}
                <p><strong>Difficulty:</strong> {getDifficultyBadge(selectedItem.difficulty)}</p>
              </Col>
              <Col md={6}>
                <p><strong>Organizer:</strong> {selectedItem.organizer}</p>
                {selectedItem.price && <p><strong>Price:</strong> {selectedItem.price}</p>}
                {selectedItem.admission && <p><strong>Admission:</strong> {selectedItem.admission}</p>}
                {selectedItem.group_size && <p><strong>Group Size:</strong> {selectedItem.group_size}</p>}
                {selectedItem.show_frequency && <p><strong>Show Frequency:</strong> {selectedItem.show_frequency}</p>}
                <p><strong>Registration:</strong> 
                  <Badge bg={selectedItem.registration === 'Open' ? 'success' : 'secondary'} className="ms-2">
                    {selectedItem.registration}
                  </Badge>
                </p>
              </Col>
            </Row>
            <p><strong>Overview:</strong></p>
            <p>{selectedItem.description}</p>
            {selectedItem.highlights && (
              <>
                <p><strong>Highlights:</strong></p>
                <p>{selectedItem.highlights}</p>
              </>
            )}
            {selectedItem.includes && (
              <>
                <p><strong>Includes:</strong></p>
                <p>{selectedItem.includes}</p>
              </>
            )}
            {selectedItem.important_notice && (
              <div className="alert alert-warning">
                <strong>Important Notice:</strong> {selectedItem.important_notice}
              </div>
            )}
            {selectedItem.dress_code && (
              <div className="alert alert-info">
                <strong>Dress Code:</strong> {selectedItem.dress_code}
              </div>
            )}
            {selectedItem.refund_policy && (
              <p><strong>Refund Policy:</strong> {selectedItem.refund_policy}</p>
            )}
            {selectedItem.contact && (
              <p><strong>Contact:</strong> {selectedItem.contact}</p>
            )}
            {selectedItem.category && (
              <p><strong>Category:</strong> {selectedItem.category}</p>
            )}
            {selectedItem.ticket_instructions && (
              <div className="alert alert-info">
                <strong>Ticket Instructions:</strong> {selectedItem.ticket_instructions}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => toggleBookmark('event', selectedItem.id)}>
              ⭐ Remove from Bookmarks
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            {selectedItem.registration === 'Open' && selectedItem.ticket_link && (
              <Button 
                variant="success"
                onClick={() => window.open(selectedItem.ticket_link, '_blank')}
              >
                Link to Event
              </Button>
            )}
          </Modal.Footer>
        </>
      );
    }

    return null;
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">⭐ My Bookmarks</h1>
          <p className="lead">All your saved trails, sightseeing spots, and events</p>
        </Col>
      </Row>

      {!user ? (
        <Row>
          <Col>
            <div className="text-center py-5">
              <h2 className="mb-3">Please log in to view your bookmarks</h2>
              <p className="text-muted mb-4">
                Sign in to keep track of your saved trails, sightseeing spots, and events.
              </p>
              <Button as={Link} to="/login" variant="success">
                Go to Login
              </Button>
            </div>
          </Col>
        </Row>
      ) : allBookmarks.length === 0 ? (
        <Row>
          <Col>
            <div className="text-center py-5">
              <p className="text-muted fs-5">You haven't bookmarked anything yet.</p>
              <p className="text-muted">Visit the <a href="#/trails">Trails</a>, <a href="#/sightseeing">Sightseeing</a>, or <a href="#/events">Events</a> pages to start bookmarking!</p>
            </div>
          </Col>
        </Row>
      ) : (
        <Tabs defaultActiveKey="all" className="mb-4">
          <Tab eventKey="all" title={`All (${allBookmarks.length})`}>
            <Row>
              {bookmarkedTrails.map(renderTrailCard)}
              {bookmarkedSightseeing.map(renderSightseeingCard)}
              {bookmarkedEvents.map(renderEventCard)}
            </Row>
          </Tab>
          <Tab eventKey="trails" title={`Trails (${bookmarkedTrails.length})`}>
            <Row>
              {bookmarkedTrails.length === 0 ? (
                <Col>
                  <div className="text-center py-5">
                    <p className="text-muted">No bookmarked trails.</p>
                  </div>
                </Col>
              ) : (
                bookmarkedTrails.map(renderTrailCard)
              )}
            </Row>
          </Tab>
          <Tab eventKey="sightseeing" title={`Sightseeing (${bookmarkedSightseeing.length})`}>
            <Row>
              {bookmarkedSightseeing.length === 0 ? (
                <Col>
                  <div className="text-center py-5">
                    <p className="text-muted">No bookmarked sightseeing spots.</p>
                  </div>
                </Col>
              ) : (
                bookmarkedSightseeing.map(renderSightseeingCard)
              )}
            </Row>
          </Tab>
          <Tab eventKey="events" title={`Events (${bookmarkedEvents.length})`}>
            <Row>
              {bookmarkedEvents.length === 0 ? (
                <Col>
                  <div className="text-center py-5">
                    <p className="text-muted">No bookmarked events.</p>
                  </div>
                </Col>
              ) : (
                bookmarkedEvents.map(renderEventCard)
              )}
            </Row>
          </Tab>
        </Tabs>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {renderModal()}
      </Modal>
    </Container>
  );
}
