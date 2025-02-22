import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import ParentDashboard from './components/Dashboard/ParentDashboard/ParentDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard/DoctorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
