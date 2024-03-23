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
import { ProfileProvider } from './context/ProfileContext';
import VerifyEmail from './pages/VerifyEmail';
import {Toaster} from 'react-hot-toast';

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
            <ProfileProvider>
            <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{
              top: 200
            }}
            toastOptions={{
              // Define default options
              className: '',
              duration: 3000,
              style: {
                background: '#fff',
                color: '#363636',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'white',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} /> {/* Route to the Profile page */}
            <Route path="/verify-email/:str" element={<VerifyEmail />} />
          </Routes>
            </ProfileProvider>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

