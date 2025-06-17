import { useState, useEffect } from 'react';
import { useGetUserPostsQuery } from '../services/api';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';
import { Link } from 'react-router-dom';
import UserBlogs from '../components/Blog/UserBlogs';
import './Profile.css';

const Profile = () => {
  const userInfo = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState('blogs');
  
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserPostsQuery(userInfo?._id, {
    skip: !userInfo?._id,
  });

  useEffect(() => {
    if (userInfo?._id) {
      refetch();
    }
  }, [userInfo, refetch]);

  if (!userInfo) {
    return (
      <div className="profile-page">
        <div className="auth-message">
          Please <Link to="/login">login</Link> to view your profile
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h1>Welcome, {userInfo.firstName} {userInfo.lastName}</h1>
          <p>Email: {userInfo.email}</p>
          {userInfo.age && <p>Age: {userInfo.age}</p>}
        </div>
      </div>

      <div className="profile-tabs">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
        >
          My Blogs
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'blogs' ? (
          <>
            {isLoading && <div className="loading">Loading your posts...</div>}
            {isError && (
              <div className="error">
                Error: {error?.data?.message || 'Failed to load posts'}
              </div>
            )}
            {!isLoading && !isError && <UserBlogs posts={posts} refetch={refetch} />}
          </>
        ) : (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;