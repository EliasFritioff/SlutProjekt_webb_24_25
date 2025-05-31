import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Homepage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Välkommen till Hemsidoskaparen</h1>
      <div className="cards-container">
        <div className="card">
          <img src="admin-alt.svg" alt="Admin Page" style={{width: '24px', height: '24px'}} />
          <h2>Generera/redigera-sida</h2>
          <Link to="/admin">Gå till Admin</Link>
        </div>

        <div className="card">
          <img src="/copy.svg" alt="Generated Page" style={{width: '24px', height: '24px'}} />
          <h2>Genererad sida</h2>
          <Link to="/custom-page">Gå till Genererad sida</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
