import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './components/Auth';
import Rules from './components/Rules';
import Booking from './pages/Booking';
import Complaints from './pages/Complaints';
import Contact from './components/Contact';
import Profile from './pages/profile';
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
            <Route path="/profile" element={<Profile />} /> {/* Route to the Profile page */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

