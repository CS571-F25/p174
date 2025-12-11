import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Tabs, Tab } from 'react-bootstrap';
import { sightseeingData } from '../data/sightseeingData';
import { useBookmarks } from '../contexts/BookmarkContext';
import ImageWithFallback from './ImageWithFallback';

export default function Sightseeing() {
  const [filteredSpots, setFilteredSpots] = useState(sightseeingData);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleFilterChange = (type) => {
    setFilter(type);
    if (type === 'all') {
      setFilteredSpots(sightseeingData);
    } else {
      setFilteredSpots(sightseeingData.filter(spot => spot.type === type));
    }
  };

  const openSpotDetails = (spot) => {
    setSelectedSpot(spot);
    setShowModal(true);
  };

  const islands = sightseeingData.filter(spot => spot.type === 'Island');
  const beaches = sightseeingData.filter(spot => spot.type === 'Beach');
  const viewpoints = sightseeingData.filter(spot => spot.type === 'Viewpoint');

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">🏝️ Sightseeing</h1>
          <p className="lead">Discover beautiful islands, beaches, and viewpoints across Hong Kong</p>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="all"
        className="mb-4"
        onSelect={(k) => handleFilterChange(k || 'all')}
      >
        <Tab eventKey="all" title={`All (${sightseeingData.length})`}>
          <Row>
            {filteredSpots.map(spot => (
              <Col md={6} lg={4} key={spot.id} className="mb-4">
                <SightseeingCard spot={spot} onViewDetails={openSpotDetails} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="Island" title={`Islands (${islands.length})`}>
          <Row>
            {islands.map(spot => (
              <Col md={6} lg={4} key={spot.id} className="mb-4">
                <SightseeingCard spot={spot} onViewDetails={openSpotDetails} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="Beach" title={`Beaches (${beaches.length})`}>
          <Row>
            {beaches.map(spot => (
              <Col md={6} lg={4} key={spot.id} className="mb-4">
                <SightseeingCard spot={spot} onViewDetails={openSpotDetails} />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="Viewpoint" title={`Viewpoints (${viewpoints.length})`}>
          <Row>
            {viewpoints.map(spot => (
              <Col md={6} lg={4} key={spot.id} className="mb-4">
                <SightseeingCard spot={spot} onViewDetails={openSpotDetails} />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedSpot && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedSpot.name}
                <Badge bg="info" className="ms-2">{selectedSpot.type}</Badge>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ImageWithFallback 
                src={selectedSpot.photo} 
                alt={selectedSpot.name}
                className="img-fluid rounded mb-3"
              />
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Type:</strong> {selectedSpot.type}</p>
                  <p><strong>Location:</strong> {selectedSpot.location}</p>
                  <p><strong>District:</strong> {selectedSpot.district}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Duration:</strong> {selectedSpot.duration}</p>
                  <p><strong>Best Time:</strong> {selectedSpot.bestTime}</p>
                  <p><strong>Rating:</strong> ⭐ {selectedSpot.rating}/5.0</p>
                </Col>
              </Row>
              <p><strong>Description:</strong></p>
              <p>{selectedSpot.description}</p>
              <p><strong>Highlights:</strong></p>
              <ul>
                {selectedSpot.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <p><strong>Transport:</strong> {selectedSpot.transport}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={() => toggleBookmark('sightseeing', selectedSpot.id)}>
                {isBookmarked('sightseeing', selectedSpot.id) ? '⭐ Remove from Bookmarks' : '☆ Add to Bookmarks'}
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

function SightseeingCard({ spot, onViewDetails }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const getTypeIcon = (type) => {
    switch(type) {
      case 'Island': return '🏝️';
      case 'Beach': return '🏖️';
      case 'Viewpoint': return '🌄';
      default: return '📍';
    }
  };

  return (
      <Card className="h-100 shadow-sm">
      <ImageWithFallback 
        variant="top" 
        src={spot.photo}
        alt={spot.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>
            {getTypeIcon(spot.type)} {spot.name}
            <Badge bg="info" className="ms-2">{spot.type}</Badge>
          </Card.Title>
          <Button
            variant={isBookmarked('sightseeing', spot.id) ? 'warning' : 'outline-secondary'}
            size="sm"
            onClick={() => toggleBookmark('sightseeing', spot.id)}
          >
            {isBookmarked('sightseeing', spot.id) ? '⭐' : '☆'}
          </Button>
        </div>
        <Card.Text>
          <small className="text-muted">
            📍 {spot.location} • 🕐 {spot.duration} • ⭐ {spot.rating}
          </small>
        </Card.Text>
        <Card.Text className="flex-grow-1">{spot.description.substring(0, 120)}...</Card.Text>
        <Button variant="success" onClick={() => onViewDetails(spot)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
