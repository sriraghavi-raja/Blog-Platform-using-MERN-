import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">BlogSphere</h3>
            <p>Where your ideas find their voice</p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Connect</h4>
            <ul className="footer-links">
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;