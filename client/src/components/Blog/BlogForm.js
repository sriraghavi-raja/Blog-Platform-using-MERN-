import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreatePostMutation, useUpdatePostMutation, useGetPostByIdQuery } from '../../services/api';
import { useSelector } from 'react-redux';
import './BlogForm.css';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    featuredImage: ''
  });
  const [error, setError] = useState('');
  
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { data: existingPost } = useGetPostByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (existingPost) {
      // Verify the current user owns this post before editing
      if (existingPost.authorId !== userInfo?._id) {
        navigate('/profile');
        return;
      }
      
      setFormData({
        title: existingPost.title,
        content: existingPost.content,
        tags: existingPost.tags.join(', '),
        featuredImage: existingPost.featuredImage || ''
      });
    }
  }, [existingPost, userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!userInfo) {
      setError('You must be logged in to create posts');
      return;
    }

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      authorId: userInfo._id,
      author: `${userInfo.firstName} ${userInfo.lastName}`,
      authorEmail: userInfo.email
    };

    try {
      if (id) {
        await updatePost({ id, ...postData }).unwrap();
      } else {
        await createPost(postData).unwrap();
      }
      navigate('/profile');
    } catch (err) {
      console.error('Failed to save post:', err);
      setError(err.data?.message || 'Failed to save post. Please try again.');
    }
  };

  return (
    <div className="blog-form-container">
      <h2 className="form-title">{id ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image URL</label>
          <input
            id="featuredImage"
            name="featuredImage"
            type="url"
            value={formData.featuredImage}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            placeholder="technology, programming, web"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content*</label>
          <textarea
            id="content"
            name="content"
            required
            rows="10"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here..."
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn">
            {id ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;