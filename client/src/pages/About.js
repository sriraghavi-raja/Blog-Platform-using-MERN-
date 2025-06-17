import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About BlogSphere</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              BlogSphere was founded in 2023 with a simple mission: to create a platform where 
              writers and readers can connect through the power of storytelling. We believe 
              everyone has a story to tell, and we're here to help you share yours with the world.
            </p>
          </section>
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              To empower creators by providing a beautiful, intuitive platform for sharing ideas 
              and building communities around shared interests. We're committed to making content 
              creation accessible to everyone.
            </p>
          </section>
          <section className="about-section">
            <h2>The Team</h2>
            <p>
              We're a small but passionate team of developers, designers, and content creators 
              who believe in the transformative power of blogging. We're constantly working to 
              improve BlogSphere based on feedback from our amazing community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;