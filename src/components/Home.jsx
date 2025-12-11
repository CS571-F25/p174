import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ImageWithFallback from './ImageWithFallback';

export default function Home() {
  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <div className="text-center py-5">
            <h1 className="display-4 mb-3">🇭🇰 Discover Hong Kong Outdoors</h1>
            <p className="lead">
              Your comprehensive guide to hiking trails, outdoor attractions and events across Hong Kong
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
            <ImageWithFallback 
              variant="top" 
              src="https://www.cathaypacific.com/content/dam/focal-point/digital-library/global-marketing/hong-kong-hiking/hiking_hero_1700x1133.renditionimage.1700.850.jpg"
              alt="Hikers exploring Hong Kong trails"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>🏔️ Hiking Trails</Card.Title>
              <Card.Text>
                Explore over 50 hiking trails across Hong Kong, from easy family walks to challenging mountain peaks. 
                Each trail includes detailed information about difficulty, duration, location, and highlights.
              </Card.Text>
              <Button as={Link} to="/trails" variant="success">
                Explore Trails
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
            <ImageWithFallback 
              variant="top" 
              src="https://www.cathaypacific.com/content/dam/destinations/hong-kong/cityguide-gallery/hiking_mui-wo_900x600.originalimage.jpg"
              alt="Scenic Mui Wo coastline"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>🏝️ Sightseeing</Card.Title>
              <Card.Text>
                Discover beautiful islands, pristine beaches, and stunning viewpoints throughout Hong Kong. 
                Plan your perfect day trip or weekend getaway.
              </Card.Text>
              <Button as={Link} to="/sightseeing" variant="success">
                View Attractions
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
            <ImageWithFallback 
              variant="top" 
              src="https://www.discoverhongkong.com/eng/what-s-new/events.thumb.800.480.png?ck=1765271403"
              alt="Hong Kong outdoor events collage"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>📅 Events</Card.Title>
              <Card.Text>
                Join upcoming outdoor events including group hikes, beach cleanups, photography workshops, 
                and more. Connect with fellow outdoor enthusiasts.
              </Card.Text>
              <Button as={Link} to="/events" variant="success">
                See Events
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
            <ImageWithFallback 
              variant="top" 
              src="https://www.discoverhongkong.com/content/dam/dhk/gohk/images/routes/trail-running/hero-image/trailrunevent_Wide_Medium.jpg"
              alt="Trail runners in Hong Kong"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>✍️ Community Blog</Card.Title>
              <Card.Text>
                Share your outdoor adventures, read stories from fellow hikers, and get inspired for your next trip. 
                Post photos, tips, and connect with the community.
              </Card.Text>
              <Button as={Link} to="/blog" variant="success">
                Visit Blog
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="bg-light shadow-sm">
            <Card.Body>
              <Card.Title>🛡️ Safety First</Card.Title>
              <Card.Text>
                Before you head out, make sure you're prepared! Check out our comprehensive safety tips covering 
                everything from what to pack to emergency procedures. Your safety is our priority.
              </Card.Text>
              <Button as={Link} to="/safety-tips" variant="outline-success">
                Learn Safety Tips
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <div className="text-center py-4">
            <h2 className="mb-3">Features</h2>
            <Row>
              <Col md={4} className="mb-3">
                <h3>🗺️ Filter & Search</h3>
                <p>Find trails and attractions based on difficulty, location, duration, and more</p>
              </Col>
              <Col md={4} className="mb-3">
                <h3>⭐ Bookmark Favorites</h3>
                <p>Save trails and spots you want to visit for easy access later</p>
              </Col>
              <Col md={4} className="mb-3">
                <h3>👥 Community</h3>
                <p>Share experiences, read reviews, and connect with other outdoor lovers</p>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
