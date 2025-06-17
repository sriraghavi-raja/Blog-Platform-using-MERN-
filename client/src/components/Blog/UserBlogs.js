import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';
import { useDeletePostMutation } from '../../services/api';
import './UserBlogs.css';

const UserBlogs = ({ posts, refetch }) => {
  const [deletePost] = useDeletePostMutation();
  const [viewMode, setViewMode] = useState('grid');

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete post:', err);
      }
    }
  };

  return (
    <div className="user-blogs">
      <div className="view-controls">
        <button 
          onClick={() => setViewMode('grid')} 
          className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
        >
          Grid View
        </button>
        <button 
          onClick={() => setViewMode('list')} 
          className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
        >
          List View
        </button>
        <Link to="/blogs/new" className="btn">
          Create New Post
        </Link>
      </div>
      
      <BlogList 
        posts={posts} 
        isOwner={true}
        onDelete={handleDelete}
        viewMode={viewMode}
      />
    </div>
  );
};

export default UserBlogs;