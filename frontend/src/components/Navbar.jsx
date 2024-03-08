import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Navbar.css';
import logo from '../images/Indian_Institute_of_Technology,_Indore_Logo.png';
function Navbar() {
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
            <nav className="navbar navbar-expand-lg navbar-dark text-white">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2  h5" style={{ fontWeight: 600 }}>
                            <li className="nav-item">
                                <a className="nav-link"  href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/rules">Rules</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/links">Forms</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/services">Additional Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/accounts/login/">Login</a>
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