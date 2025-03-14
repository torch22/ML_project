import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Materials from './pages/Materials';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import RegressionChart from './pages/RegressionChart';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handleAuthClick = () => {
    setIsModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <motion.div
        className="preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        exit={{ opacity: 0 }}
      >
        <div className="preloader-content">
          <h1>Insight Factory</h1>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Router>
      <Navbar onAuthClick={handleAuthClick} />
      <Routes>
        <Route path="/" element={<Home onAuthClick={handleAuthClick} />} />
        <Route path="/about" element={<About onAuthClick={handleAuthClick} />} />
        <Route path="/materials" element={<Materials onAuthClick={handleAuthClick} />} />
        <Route path="/regression-chart" element={<RegressionChart onAuthClick={handleAuthClick} />} />
      </Routes>
      <AuthModal isOpen={isModalOpen} onClose={handleAuthClose} />
    </Router>
  );
}

export default App;