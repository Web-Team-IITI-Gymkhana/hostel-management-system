import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthContext from '../context/AuthContext.jsx';
import '../css/Navbar.css';
import logo from '../images/Indian_Institute_of_Technology,_Indore_Logo.png';
import { useState,useContext } from 'react';

function Navbar() {
    const navigate = useNavigate();
    let {user,logout} = useContext(AuthContext)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        console.log("clicked")
    }; 
    const handleClick = () => {
        // Close the menu when clicking on the link
        setMenuOpen(false);
        
        // Navigate to the '/profile' route
        navigate('/profile');
      };
    return (
        <>
            <div className="logo bg-white py-2 px-0 mx-md-3 mx-0 container-md">
                <a href="https://www.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="row text-decoration-none header mx-0 d-flex justify-content-center align-items-center">
                    <img src={logo} alt="" height="80px" width="100px" className="col-lg-1 col-2" />
                    <span className=" logo_text col-lg-11 col-10 py-2 align-self-center">
                        <span className="h3 mb-2"> विश्व विद्यालय भवन  | Hall of Residence</span>
                        <span className="fw-bold " >भारतीय प्रौद्योगिकी संस्थान, इंदौर | Indian Institute of Technology, Indore</span>
                    </span>
                </a>
            </div>
            <div className="navigation">
                <nav className="bg-[rgb(18, 37, 106)] w-full z-20">
                    <div className="flex flex-wrap items-center justify-between px-5 mx-auto">
                    <div className="flex py-2 md:order-2 space-x-3 md:space-x-0 w-screen justify-between md:w-max">
                        <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                        {user===null ? <Link to='/auth' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center text-xl">Login</Link>
                        : <button onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center text-xl">Logout</button>}
                    </div>
                    <div className={`items-center justify-between ${isMenuOpen? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                        <ul className="flex flex-col p-2 md:p-0 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link onClick={() => setMenuOpen(false)} to='' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} to='/rules' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl">Rules</Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} to='/booking' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl">Booking</Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} to='/complaints' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl">Complaints</Link>
                        </li>
                        <li>
                            <Link onClick={() => setMenuOpen(false)} to='/contact' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl">Contact</Link>
                        </li>
                        { user&&
                        <li>
                            <Link  to='/profile' className="block py-2 md:py-0 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 text-xl">Profile</Link>
                        </li>}
                        </ul>
                    </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar