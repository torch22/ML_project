import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Materials from './components/Materials';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <Navbar onAuthClick={handleAuthClick} />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/materials" element={<Materials />} />
      </Routes>
    </div>
  );
}

export default App;