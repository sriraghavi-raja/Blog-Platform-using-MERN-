import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await register(formData).unwrap();
      dispatch(setCredentials(res));
      navigate('/profile');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.data?.message || err.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age (Optional)</label>
            <input
              id="age"
              name="age"
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
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
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (min 6 characters)"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn auth-btn"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;