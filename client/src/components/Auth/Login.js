import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res));
      navigate('/profile');
    } catch (err) {
      setError(err.data?.message || err.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign in to your account</h2>
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn auth-btn"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;