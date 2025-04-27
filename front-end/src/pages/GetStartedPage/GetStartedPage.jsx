import React from 'react';
import { Link } from 'react-router-dom';
import './GetStartedPage.css'; // importe les styles CSS

const GetStartedPage = () => {
  return (
    <div className="get-started-container">
      
      {/* Header */}
      <header className="header">
        <h1 className="logo">Kenny Store</h1>
        <Link to="/admin/login">
          <button className="admin-button">Admin Sign In</button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2 className="hero-title">
          Grocery delivery, <span className="highlight">reimagined</span>
        </h2>
        <p className="hero-subtitle">
          Your groceries run to you — not the other way around. <br />
          Fast, free, and effortless.
        </p>
        <Link to="/home">
          <button className="get-started-button">Get Started</button>
        </Link>
      </main>

    </div>
  );
};

export default GetStartedPage;
