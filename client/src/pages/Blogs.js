import { useState } from 'react';
import { useGetAllPostsQuery, useGetUserPostsQuery } from '../services/api';
import BlogList from '../components/Blog/BlogList';
import { useSelector } from 'react-redux';
import './Blogs.css';

const Blogs = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [viewMode, setViewMode] = useState('all');
  
  const { data: allPosts, isLoading: isLoadingAll } = useGetAllPostsQuery();
  const { data: userPosts, isLoading: isLoadingUser } = useGetUserPostsQuery(userInfo?._id, {
    skip: !userInfo?._id,
  });

  const postsToShow = viewMode === 'all' ? allPosts : userPosts;

  return (
    <div className="blogs-page">
      <div className="blogs-header">
        <h1>Blog Posts</h1>
        {userInfo && (
          <div className="view-controls">
            <button
              onClick={() => setViewMode('all')}
              className={`view-btn ${viewMode === 'all' ? 'active' : ''}`}
            >
              All Posts
            </button>
            <button
              onClick={() => setViewMode('my')}
              className={`view-btn ${viewMode === 'my' ? 'active' : ''}`}
            >
              My Posts
            </button>
          </div>
        )}
      </div>
      
      {(isLoadingAll || isLoadingUser) ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <BlogList posts={postsToShow || []} />
      )}
    </div>
  );
};

export default Blogs;