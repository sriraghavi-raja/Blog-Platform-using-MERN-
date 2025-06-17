import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './BlogDetails.css';

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLikes(res.data.likes || 0); // optional: if likes are stored in DB
      })
      .catch((err) => {
        console.error('Error fetching post:', err.message);
        if (err.response) {
          console.error('Response data:', err.response.data);
        }
      });
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
    // Optionally send to backend:
    // axios.post(`http://localhost:5000/api/posts/${id}/like`);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  if (!post) return <div className="loading">Loading blog...</div>;

  return (
    <div className="blog-details-container">
      <div className="blog-card">
        {post.image && (
          <img src={post.image} alt="Featured" className="blog-featured-image" />
        )}
        <h1 className="blog-title">{post.title}</h1>
        <div className="blog-meta">
          <span>By <strong>{post.author}</strong></span> ·{' '}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Like & Share Buttons */}
        <div className="blog-actions">
          <button className="like-btn" onClick={handleLike}>👍 {likes} Like{likes !== 1 ? 's' : ''}</button>
          <button className="share-btn" onClick={handleShare}>🔗 Share</button>
        </div>
      </div>
    </div>
  );
}
