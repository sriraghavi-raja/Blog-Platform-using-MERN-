import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post, isOwner = false, onDelete }) => {
  return (
    <div className="blog-card">
      {post.featuredImage && (
        <Link to={`/blogs/${post._id}`} className="blog-image-container">
          <div 
            className="blog-image"
            style={{ backgroundImage: `url(${post.featuredImage})` }}
          />
        </Link>
      )}
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-author">{post.author || 'Anonymous'}</span>
          <span>•</span>
          <span className="blog-date">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <Link to={`/blogs/${post._id}`} className="blog-title-link">
          <h3 className="blog-title">{post.title}</h3>
        </Link>
        <div className="blog-footer">
          <div className="blog-tags">
            {post.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
          {isOwner && (
            <div className="blog-actions">
              <Link 
                to={`/blogs/${post._id}/edit`} 
                className="blog-action-btn"
                aria-label="Edit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(post._id);
                }}
                className="blog-action-btn"
                aria-label="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;