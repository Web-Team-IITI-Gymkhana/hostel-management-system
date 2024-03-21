import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AuthContext from '../context/AuthContext.jsx';
import '../css/Navbar.css';
import logo from '../images/Indian_Institute_of_Technology,_Indore_Logo.png';
import { useState, useContext } from 'react';
import 'flowbite';
function Navbar() {
    const navigate = useNavigate();
    let { user, logout } = useContext(AuthContext)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        setDropdownOpen(false)
        console.log("clicked")
    };
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown =()=>{
            setDropdownOpen(!isDropdownOpen)
            setMenuOpen(false);
    }
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
                <nav className="bg-[rgb(18, 37, 106)] w-full z-20 h-14">
                    <div className="flex flex-wrap justify-between px-5 mx-auto items-start">
                        <div className="flex py-2 lg:order-2 space-x-3 lg:space-x-0 w-screen justify-between lg:w-max">
                            <button onClick={toggleDropdown} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800" aria-controls="navbar-sticky" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                </svg>
                            </button>
                            {!user ? <Link to='/auth' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center text-xl">Login</Link>
                                :
                            <div className='flex flex-col items-end'>
                            <div onClick={toggleMenu} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            </div>
                            
                            <div className={`z-10 ${!isMenuOpen?'hidden':''} bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 mt-1`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <Link to='/profile' onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:text-blue-500">Profile</Link>
                                    </li>
                                    <li >
                                         <button onClick={logout} className="block px-4 py-2 hover:text-blue-500">Logout</button>
                                    </li>
                                </ul>
                            </div>
                            </div>
                            } 
                        </div>
                        <div className={`relative items-center justify-between ${isDropdownOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto lg:order-1`} id="navbar-sticky">
                            <ul className="flex flex-col p-2 lg:p-0 font-medium rounded-lg lg:space-x-8 lg:flex-row lg:mt-0 bg-blue-800 lg:bg-transparent m-1 w-full">
                                <li>
                                    <Link onClick={() => setDropdownOpen(false)} to='' className="block py-2 lg:py-0 px-3 text-white rounded hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 text-xl" aria-current="page">Home</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDropdownOpen(false)} to='/rules' className="block py-2 lg:py-0 px-3 text-white rounded hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 text-xl">Rules</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDropdownOpen(false)} to='/booking' className="block py-2 lg:py-0 px-3 text-white rounded hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 text-xl">Booking</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDropdownOpen(false)} to='/complaints' className="block py-2 lg:py-0 px-3 text-white rounded hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 text-xl">Complaints</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDropdownOpen(false)} to='/contact' className="block py-2 lg:py-0 px-3 text-white rounded hover:bg-blue-700 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 text-xl">Contact</Link>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar