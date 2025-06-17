import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  if (posts.length === 0) {
    return <div className="no-posts">No featured posts available</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-slides">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <div 
              className="slide-image"
              style={{ backgroundImage: `url(${post.featuredImage || 'https://via.placeholder.com/800x400'})` }}
            >
              <div className="slide-content">
                <h3 className="slide-title">{post.title}</h3>
                <p className="slide-excerpt">{post.excerpt || post.content.substring(0, 100)}...</p>
                <Link 
                  to={`/blogs/${post._id}`} 
                  className="btn slide-btn"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={prevSlide}
        className="carousel-btn prev-btn"
      >
        &lt;
      </button>
      <button 
        onClick={nextSlide}
        className="carousel-btn next-btn"
      >
        &gt;
      </button>
      <div className="carousel-dots">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;