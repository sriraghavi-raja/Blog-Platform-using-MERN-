import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import './Navbar.css';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button 
        className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </button>

      {/* Right Side Navigation Panel */}
      <div className={`navbar-panel ${isMenuOpen ? 'open' : ''}`}>
        <div className="panel-content">
          <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
            BlogSphere
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/blogs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Blogs
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            
            {userInfo ? (
              <>
                <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="nav-btn register-btn" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div className="panel-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </>
  );
};

export default Navbar;