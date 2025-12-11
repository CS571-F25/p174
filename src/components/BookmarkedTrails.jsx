import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router';
import { trailsData } from '../data/trailsData';
import { useBookmarks } from '../contexts/BookmarkContext';
import ImageWithFallback from './ImageWithFallback';

export default function BookmarkedTrails() {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Filter trails to show only bookmarked ones
  const bookmarkedTrails = trailsData.filter(trail => isBookmarked('trail', trail.id));

  const openTrailDetails = (trail) => {
    setSelectedTrail(trail);
    setShowModal(true);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">⭐ My Bookmarked Trails</h1>
          <p className="lead">Your saved hiking trails</p>
        </Col>
      </Row>

      <Row>
        {bookmarkedTrails.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <p className="text-muted fs-5">You haven't bookmarked any trails yet.</p>
              <p className="text-muted">Visit the <Link to="/trails">Trails</Link> page to start bookmarking your favorite trails!</p>
            </div>
          </Col>
        ) : (
          bookmarkedTrails.map(trail => (
            <Col md={6} lg={4} key={trail.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <ImageWithFallback 
                  variant="top" 
                  src={trail.image}
                  alt={trail.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
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
                  <Button variant="success" onClick={() => openTrailDetails(trail)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedTrail && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedTrail.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ImageWithFallback 
                src={selectedTrail.image} 
                alt={selectedTrail.name}
                className="img-fluid rounded mb-3"
              />
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Location:</strong> {selectedTrail.location}</p>
                  {selectedTrail.chinese_name && (
                    <p><strong>Chinese Name:</strong> {selectedTrail.chinese_name}</p>
                  )}
                  <p><strong>Difficulty:</strong> 
                    <Badge bg={selectedTrail.difficulty === 'Easy' ? 'success' : selectedTrail.difficulty === 'Moderate' ? 'warning' : 'danger'} className="ms-2">
                      {selectedTrail.difficulty}
                    </Badge>
                  </p>
                  <p><strong>Route Type:</strong> {selectedTrail.route_type}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Estimated Time:</strong> {selectedTrail.estimated_time_hours} hours</p>
                  <p><strong>Length:</strong> {selectedTrail.length_km} km ({selectedTrail.length_miles} miles)</p>
                  <p><strong>Elevation Gain:</strong> {selectedTrail.elevation_gain_m} m ({selectedTrail.elevation_gain_ft} ft)</p>
                  <p><strong>Rating:</strong> ⭐ {selectedTrail.rating}/5.0 ({selectedTrail.reviews_count} reviews)</p>
                </Col>
              </Row>
              <p><strong>Description:</strong></p>
              <p>{selectedTrail.description}</p>
              <p><strong>Top Sights:</strong></p>
              <ul>
                {selectedTrail.top_sights.map((sight, idx) => (
                  <li key={idx}><strong>{sight.name}</strong> - {sight.type}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={() => toggleBookmark('trail', selectedTrail.id)}>
                ⭐ Remove from Bookmarks
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}
