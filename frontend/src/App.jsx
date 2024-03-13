import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Auth from './components/Auth';
import Rules from './components/Rules';
import Booking from './components/Booking';
import Complaints from './components/Complaints';
import Contact from './components/Contact';
import {AuthProvider} from './context/AuthContext'

function App() {
  // const location = useLocation();
  // const [showNavbar, setShowNavbar] = useState(!['/auth'].includes(location.pathname));

  // useEffect(() => {
  //   setShowNavbar(!['/auth'].includes(location.pathname));
  // }, [location.pathname]);
  return (
    <Router>
      <AuthProvider>
        <div>
          {/* {showNavbar && <Navbar />} */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

