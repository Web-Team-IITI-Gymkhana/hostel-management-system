import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Rules from './components/Rules';
import Booking from './components/Booking';
import Complaints from './components/Complaints';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Rules" element={<Rules />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Complaints" element={<Complaints />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

