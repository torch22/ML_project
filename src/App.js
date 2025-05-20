import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Materials from './pages/Materials';
import Profile from './pages/Profile';
// import RegressionChart from './pages/RegressionChart';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

import AnalysisPage from './pages/AnalysisPage';

import './index.css';

function AppContent() {
  const location = useLocation();
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  useEffect(() => {
    setIsAuthRoute(location.pathname === '/auth');
  }, [location]);

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/regression-chart" element={<RegressionChart />} /> */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
      <Footer /> 
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;