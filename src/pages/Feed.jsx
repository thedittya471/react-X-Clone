import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Loading current user 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // Loading posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(savedPosts);
  }, [navigate]);

  // Logging out user
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleCreatePost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      username: currentUser.username,
      email: currentUser.email,
      text: postText,
      timestamp: new Date().toLocaleString()
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
    setPostText('');
    setShowModal(false);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  if (!currentUser) return null;

  return (
    <div className="feed-page">
      {/* Header */}
      <div className="feed-header">
        <div className="header-left">
          <div className="logo">X</div>
          <h1>Feed</h1>
        </div>
        <div className="header-right">
          <span className="username">@{currentUser.username}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Feed Container */}
      <div className="feed-container">
        {/* Create Post Button */}
        <div className="create-post-btn-section">
          <div className="user-avatar">
            {currentUser.username.charAt(0).toUpperCase()}
          </div>
          <button 
            className="btn-create-post" 
            onClick={() => setShowModal(true)}
          >
            What's happening?
          </button>
        </div>

        {/* Posts List */}
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet. Be the first to post!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-user-info">
                    <div className="post-avatar">
                      {post.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="post-info">
                      <h3 className="post-username">@{post.username}</h3>
                      <p className="post-time">{post.timestamp}</p>
                    </div>
                  </div>
                  {post.email === currentUser.email && (
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="post-text">{post.text}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Post</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <textarea
              className="modal-textarea"
              placeholder="What's happening?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              autoFocus
            />
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn-post" onClick={handleCreatePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
