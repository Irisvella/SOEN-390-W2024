import React from 'react';
import Navbar from '../components/Navbar';
import "../App.css";

const Home = () => {
  return (
    <div className="home-background">
      <Navbar />
      <div data-testid='home_content' className="content">
        <h1>Welcome to EstateFlow</h1>
        <p><h2>Discover Your Dream Space</h2></p>
        <p>
          EstateFlow is your trusted partner in navigating the bustling real estate market. Whether you're buying your first home, searching for a luxurious rental, or investing in property, our expert team is here to guide you every step of the way.
        </p>
        <div className="home-highlights">
          <h2>Why Choose EstateFlow?</h2>
          <ul>
            <li><strong>Expert Insight:</strong> Years of experience and a deep understanding of market trends.</li>
            <li><strong>Personalized Service:</strong> Tailored services to match your specific real estate needs.</li>
            <li><strong>Comprehensive Listings:</strong> Access to the best properties on the market.</li>
            <li><strong>Seamless Experience:</strong> We handle the complexities to offer you a smooth journey.</li>
          </ul>
        </div>
        <div className="home-cta">
          <p>Ready to Begin?</p>
          <p>Explore our listings, learn more about our services, and connect with our advisors. Your new beginning starts here, at EstateFlow.</p>
        </div>
        <div className="home-testimonials">
          <h3>Testimonials</h3>
          <blockquote>
            "EstateFlow transformed my property search experience. Their dedication and expertise were evident from day one. I couldn't be happier with my new home!" - <em>Alex D.</em>
          </blockquote>
          <blockquote>
            "The team at EstateFlow provided the support I needed to make a sound investment. Their market insights are truly top-notch." - <em>Priya S.</em>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Home;
