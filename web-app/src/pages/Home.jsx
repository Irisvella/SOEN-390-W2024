import React from 'react';
import Navbar from '../components/Navbar';
import "../App.css";

const Home = () => {
  return (
    <div className="home-background">
      <Navbar />
      <div className="content">
        <h1>Welcome to EstateFlow</h1>
        <p><h2>Enhancing Property Management for Everyone</h2></p>
        <p>
          EstateFlow brings a new level of efficiency and ease to property management, catering to condos, rentals, and beyond. Our platform offers a unified solution for property owners, renters, and management companies, simplifying every aspect of property management with innovative tools and features.
        </p>
        <div className="home-highlights">
          <h2>Key Features</h2>
          <ul>
            <li><strong>Unified Profiles:</strong> Create and manage profiles with essential information for owners, renters, and companies.</li>
            <li><strong>Dashboard Views:</strong> Access comprehensive dashboards for a clear overview of properties, finances, and requests.</li>
            <li><strong>Document Management:</strong> Easily upload and access important property documents in one place.</li>
            <li><strong>Financial Management:</strong> A streamlined financial system for managing fees, budgets, and reports efficiently.</li>
            <li><strong>Reservation System:</strong> Book common facilities with ease using our intuitive reservation interface.</li>
            <li><strong>Community Engagement:</strong> Enhance communication and engagement through forums, events, and more.</li>
          </ul>
        </div>
        <div className="home-cta">
          <p>Ready to Transform Your Property Management Experience?</p>
          <p>Join EstateFlow today to streamline your property management tasks, enhance community engagement, and enjoy a more organized, efficient way to manage and live in your property. Your journey to simplified property management starts here.</p>
        </div>
        <div className="home-testimonials">
          <h3>Hear From Our Users</h3>
          <blockquote>
            "EstateFlow has completely changed how I approach property management. It's intuitive, comprehensive, and incredibly user-friendly." - <em>Chris L.</em>
          </blockquote>
          <blockquote>
            "The difference EstateFlow made in our community is night and day. From management to living experience, everything is smoother." - <em>Morgan J.</em>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Home;