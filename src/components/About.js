import React, { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import '../styles/About.css';

function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar onAuthClick={() => setIsModalOpen(true)} />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="opis">
        <h1>Insight factory</h1>
        <p>product text</p>
      </div>
    </div>
  );
}

export default About;