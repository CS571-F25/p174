import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { blogPosts as initialBlogPosts, addBlogPost, addComment, likePost } from '../data/blogPosts';

// Store blog posts in localStorage for persistence
const getStoredPosts = () => {
  const stored = localStorage.getItem('blogPosts');
  return stored ? JSON.parse(stored) : initialBlogPosts;
};

const savePosts = (posts) => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

export default function Blog() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(getStoredPosts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({
    author: '',
    title: '',
    content: '',
    photo: ''
  });
  const [newComment, setNewComment] = useState({
    author: '',
    content: ''
  });

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const handleCreatePost = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (newPost.title && newPost.content) {
      const newPostData = {
        author: user.username, // Use logged-in user's username
        title: newPost.title,
        content: newPost.content,
        photos: newPost.photo ? [newPost.photo] : [], // Store as array
        id: posts.length + 1,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: []
      };
      const updatedPosts = [newPostData, ...posts];
      setPosts(updatedPosts);
      setNewPost({ author: '', title: '', content: '', photo: '' });
      setShowCreateModal(false);
    }
  };

  const handleNewPostClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCreateModal(true);
  };

  const handleAddComment = () => {
    if (selectedPost && newComment.author && newComment.content) {
      const comment = {
        ...newComment,
        id: selectedPost.comments.length + 1,
        date: new Date().toISOString().split('T')[0]
      };
      const updatedPosts = posts.map(post => 
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      );
      setPosts(updatedPosts);
      setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, comment] });
      setNewComment({ author: '', content: '' });
    }
  };


  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const openCommentModal = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-3">✍️ Community Blog</h1>
              <p className="lead">Share your outdoor adventures and read stories from fellow hikers</p>
            </div>
            {user ? (
              <Button variant="success" onClick={handleNewPostClick}>
                + New Post
              </Button>
            ) : (
              <Button variant="outline-success" onClick={handleNewPostClick}>
                Login to Post
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Row>
        {posts.length === 0 ? (
          <Col>
            <div className="text-center py-5">
              <p className="text-muted">No blog posts yet. Be the first to share your adventure!</p>
            </div>
          </Col>
        ) : (
          posts.map(post => (
            <Col md={6} lg={4} key={post.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                {post.photos && post.photos[0] && (
                  <Card.Img 
                    variant="top" 
                    src={post.photos[0]}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    By {post.author} • {formatDate(post.date)}
                  </Card.Subtitle>
                  <Card.Text className="flex-grow-1">
                    {post.content.substring(0, 150)}...
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleLike(post.id)}
                      >
                        ❤️ {post.likes}
                      </Button>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        className="ms-2"
                        onClick={() => openCommentModal(post)}
                      >
                        💬 {post.comments.length}
                      </Button>
                    </div>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => openCommentModal(post)}
                    >
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Create Post Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!user ? (
            <Alert variant="warning">
              You must be logged in to create a post. <Button variant="link" className="p-0" onClick={() => { setShowCreateModal(false); navigate('/login'); }}>Login here</Button>
            </Alert>
          ) : (
            <Form>
              {user && (
                <Alert variant="info" className="mb-3">
                  Posting as: <strong>{user.username}</strong>
                </Alert>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Share your adventure story..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Photo URL (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={newPost.photo}
                  onChange={(e) => setNewPost({ ...newPost, photo: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          {user && (
            <Button variant="success" onClick={handleCreatePost}>
              Publish Post
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* View Post & Comments Modal */}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} size="lg">
        {selectedPost && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedPost.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <small className="text-muted">
                  By {selectedPost.author} • {formatDate(selectedPost.date)}
                </small>
              </div>
              {selectedPost.photos && selectedPost.photos[0] && (
                <img 
                  src={selectedPost.photos[0]} 
                  alt={selectedPost.title}
                  className="img-fluid rounded mb-3"
                />
              )}
              <p style={{ whiteSpace: 'pre-line' }}>{selectedPost.content}</p>
              
                  <div className="d-flex align-items-center mb-4">
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleLike(selectedPost.id)}
                  className="me-2"
                >
                  ❤️ {selectedPost.likes}
                </Button>
                <Badge bg="primary">{selectedPost.comments.length} comments</Badge>
              </div>

              <hr />

              <h5>Comments</h5>
              {selectedPost.comments.length === 0 ? (
                <p className="text-muted">No comments yet. Be the first to comment!</p>
              ) : (
                selectedPost.comments.map(comment => (
                  <Card key={comment.id} className="mb-2">
                    <Card.Body>
                      <Card.Subtitle className="mb-1">{comment.author}</Card.Subtitle>
                      <Card.Text className="mb-0">{comment.content}</Card.Text>
                      <small className="text-muted">{formatDate(comment.date)}</small>
                    </Card.Body>
                  </Card>
                ))
              )}

              <hr />

              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write a comment..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                  />
                </Form.Group>
                <Button variant="success" onClick={handleAddComment}>
                  Post Comment
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

