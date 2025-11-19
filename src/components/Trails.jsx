import { useState, useContext, createContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge } from 'react-bootstrap';
import { trailsData } from '../data/trailsData';

// Create context for bookmarks
const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('trailBookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (trailId) => {
    setBookmarks(prev => {
      const newBookmarks = prev.includes(trailId)
        ? prev.filter(id => id !== trailId)
        : [...prev, trailId];
      localStorage.setItem('trailBookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);

export default function Trails() {
  const [filteredTrails, setFilteredTrails] = useState(trailsData);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    district: 'all',
    maxDuration: 'all'
  });
  const { bookmarks, toggleBookmark } = useBookmarks();

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
      filtered = filtered.filter(trail => trail.district === filterSettings.district);
    }

    if (filterSettings.maxDuration !== 'all') {
      const maxHours = parseInt(filterSettings.maxDuration);
      filtered = filtered.filter(trail => {
        const trailHours = parseInt(trail.duration.split('-')[0]);
        return trailHours <= maxHours;
      });
    }

    setFilteredTrails(filtered);
  };

  const openTrailDetails = (trail) => {
    setSelectedTrail(trail);
    setShowModal(true);
  };

  const districts = [...new Set(trailsData.map(trail => trail.district))];

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
          <Form.Group>
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
          <Form.Group>
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
          <Form.Group>
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
                <Card.Img 
                  variant="top" 
                  src={trail.photo}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{trail.name}</Card.Title>
                    <Button
                      variant={bookmarks.includes(trail.id) ? 'warning' : 'outline-secondary'}
                      size="sm"
                      onClick={() => toggleBookmark(trail.id)}
                    >
                      {bookmarks.includes(trail.id) ? '⭐' : '☆'}
                    </Button>
                  </div>
                  <Card.Text>
                    <Badge bg={trail.difficulty === 'Easy' ? 'success' : trail.difficulty === 'Moderate' ? 'warning' : 'danger'}>
                      {trail.difficulty}
                    </Badge>
                    {' '}
                    <Badge bg="info">{trail.duration}</Badge>
                    <br />
                    <small className="text-muted">
                      📍 {trail.location} • 🕐 {trail.distance} • ⛰️ {trail.elevation}
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
              <img 
                src={selectedTrail.photo} 
                alt={selectedTrail.name}
                className="img-fluid rounded mb-3"
              />
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Location:</strong> {selectedTrail.location}</p>
                  <p><strong>District:</strong> {selectedTrail.district}</p>
                  <p><strong>Difficulty:</strong> 
                    <Badge bg={selectedTrail.difficulty === 'Easy' ? 'success' : selectedTrail.difficulty === 'Moderate' ? 'warning' : 'danger'} className="ms-2">
                      {selectedTrail.difficulty}
                    </Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <p><strong>Duration:</strong> {selectedTrail.duration}</p>
                  <p><strong>Distance:</strong> {selectedTrail.distance}</p>
                  <p><strong>Elevation:</strong> {selectedTrail.elevation}</p>
                  <p><strong>Rating:</strong> ⭐ {selectedTrail.rating}/5.0</p>
                </Col>
              </Row>
              <p><strong>Description:</strong></p>
              <p>{selectedTrail.description}</p>
              <p><strong>Highlights:</strong></p>
              <ul>
                {selectedTrail.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <p><strong>Transport:</strong> {selectedTrail.transport}</p>
              <p><strong>Best Time to Visit:</strong> {selectedTrail.bestTime}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={() => toggleBookmark(selectedTrail.id)}>
                {bookmarks.includes(selectedTrail.id) ? '⭐ Remove from Bookmarks' : '☆ Add to Bookmarks'}
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

