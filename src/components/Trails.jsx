import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge } from 'react-bootstrap';
import { trailsData } from '../data/trailsData';
import { useBookmarks } from '../contexts/BookmarkContext';
import ImageWithFallback from './ImageWithFallback';

export default function Trails() {
  const [filteredTrails, setFilteredTrails] = useState(trailsData);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    district: 'all',
    maxDuration: 'all'
  });
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filterSettings) => {
    let filtered = [...trailsData];

    if (filterSettings.difficulty !== 'all') {
      filtered = filtered.filter(trail => 
        trail.difficulty.toLowerCase() === filterSettings.difficulty.toLowerCase()
      );
    }

    if (filterSettings.district !== 'all') {
      filtered = filtered.filter(trail => {
        // Extract district from location string
        const location = trail.location || '';
        return location.includes(filterSettings.district);
      });
    }

    if (filterSettings.maxDuration !== 'all') {
      const maxHours = parseInt(filterSettings.maxDuration);
      filtered = filtered.filter(trail => {
        if (!trail.estimated_time_hours || trail.estimated_time_hours === '—') return false;
        // Parse estimated_time_hours (e.g., "2–2.5" or "1–1.5")
        const timeStr = trail.estimated_time_hours.split('–')[0].trim();
        const trailHours = parseFloat(timeStr);
        return trailHours <= maxHours;
      });
    }

    setFilteredTrails(filtered);
  };

  const openTrailDetails = (trail) => {
    setSelectedTrail(trail);
    setShowModal(true);
  };

  // Extract districts from location strings
  const districts = [...new Set(trailsData.map(trail => {
    const location = trail.location || '';
    // Extract district name (usually appears after a comma or as part of the location)
    const parts = location.split(',');
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    // Fallback: try to extract common district names
    const districtMatch = location.match(/(\w+\s+District|Island|Kowloon)/);
    return districtMatch ? districtMatch[0] : location;
  }).filter(Boolean))];

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">🏔️ Hiking Trails</h1>
          <p className="lead">Discover amazing hiking trails across Hong Kong</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Form.Group controlId="trailDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="trailDistrict">
            <Form.Label>District</Form.Label>
            <Form.Select name="district" value={filters.district} onChange={handleFilterChange}>
              <option value="all">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4} className="mb-3">
          <Form.Group controlId="trailDuration">
            <Form.Label>Max Duration (hours)</Form.Label>
            <Form.Select name="maxDuration" value={filters.maxDuration} onChange={handleFilterChange}>
              <option value="all">Any Duration</option>
              <option value="2">Up to 2 hours</option>
              <option value="3">Up to 3 hours</option>
              <option value="4">Up to 4 hours</option>
              <option value="6">Up to 6 hours</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {filteredTrails.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <p className="text-muted">No trails match your filters. Try adjusting your criteria.</p>
            </div>
          </Col>
        ) : (
          filteredTrails.map(trail => (
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
                      variant={isBookmarked('trail', trail.id) ? 'warning' : 'outline-secondary'}
                      size="sm"
                      onClick={() => toggleBookmark('trail', trail.id)}
                    >
                      {isBookmarked('trail', trail.id) ? '⭐' : '☆'}
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
                {isBookmarked('trail', selectedTrail.id) ? '⭐ Remove from Bookmarks' : '☆ Add to Bookmarks'}
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
