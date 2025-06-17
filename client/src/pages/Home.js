
import { Link } from 'react-router-dom';

import FeatureCard from '../components/Common/FeatureCard';

import blogVideo from '../templates/blog.mp4';
import './Home.css';

const Home = () => {
  

  const features = [
    {
      title: 'Create Beautiful Blogs',
      description: 'Write and publish your thoughts with our easy-to-use editor.',
      icon: '✍️',
    },
    {
      title: 'Engage with Community',
      description: 'Get feedback and comments from a vibrant community of readers.',
      icon: '👥',
    },
    {
      title: 'Customize Your Profile',
      description: 'Personalize your profile to showcase your unique style.',
      icon: '🎨',
    },
  ];

  return (
    <div className="home-page">
      {/* Video Background Elements */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={blogVideo} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-overlay"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BlogSphere</h1>
          <p className="hero-subtitle">Where your ideas find their voice</p>
          <Link to="/blogs" className="btn hero-btn">
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">Amazing Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;