import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { blogPosts as initialBlogPosts, addBlogPost, addComment, likePost } from '../data/blogPosts';
import ImageWithFallback from './ImageWithFallback';

// Store blog posts in localStorage for persistence
// Always merge community posts with user-created posts
const getStoredPosts = () => {
  const stored = localStorage.getItem('userBlogPosts');
  const userPosts = stored ? JSON.parse(stored) : [];
  
  // Get IDs of community posts to avoid duplicates
  const communityPostIds = new Set(initialBlogPosts.map(post => post.id));
  
  // Filter out any user posts that might have conflicting IDs with community posts
  const validUserPosts = userPosts.filter(post => !communityPostIds.has(post.id));
  
  // Merge: community posts first, then user posts
  return [...initialBlogPosts, ...validUserPosts];
};

const savePosts = (posts) => {
  // Only save user-created posts to localStorage
  // Community posts are always loaded from initialBlogPosts
  const communityPostIds = new Set(initialBlogPosts.map(post => post.id));
  const userPosts = posts.filter(post => !communityPostIds.has(post.id));
  localStorage.setItem('userBlogPosts', JSON.stringify(userPosts));
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
  const fileInputRef = useRef(null);

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const resetNewPostForm = () => {
    setNewPost({ author: '', title: '', content: '', photo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (newPost.title && newPost.content) {
      // Use timestamp-based ID to avoid conflicts across devices
      const newPostId = Date.now();
      const newPostData = {
        author: user.username, // Use logged-in user's username
        title: newPost.title,
        content: newPost.content,
        photos: newPost.photo ? [newPost.photo] : [], // Store as array
        id: newPostId,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: []
      };
      const updatedPosts = [newPostData, ...posts];
      setPosts(updatedPosts);
      resetNewPostForm();
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
      // Use timestamp-based ID for comments to avoid conflicts
      const commentId = Date.now();
      const comment = {
        ...newComment,
        id: commentId,
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

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setNewPost(prev => ({ ...prev, photo: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
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
                  <ImageWithFallback 
                    variant="top" 
                    src={post.photos[0]}
                    alt={post.title}
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
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postContent">
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
              <Form.Group className="mb-3" controlId="postPhoto">
                <Form.Label>Upload Photo (optional)</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                />
                <Form.Text className="text-muted">
                  Choose an image from your device to show at the top of your post.
                </Form.Text>
              </Form.Group>
              {newPost.photo && (
                <div className="mb-3">
                  <div className="small text-muted mb-2">Image preview</div>
                  <ImageWithFallback
                    src={newPost.photo}
                    alt="New post preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                  />
                </div>
              )}
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
                <ImageWithFallback 
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

              <h2>Comments</h2>
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
                <Form.Group className="mb-2" controlId="commentAuthor">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={newComment.author}
                    onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="commentContent">
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
