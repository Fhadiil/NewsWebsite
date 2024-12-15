import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaUser } from 'react-icons/fa';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    'Home', 'Business', 'Technology', 
    'Politics', 'Sports', 'Entertainment'
  ];
  return (
    <div className='container-fluid'>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white text-center flex-column">
        <div className="container">
          {/* Logo and Title */}
          <div className="w-100 text-center mb-3">
            <h1 className="navbar-brand fw-bold">The News</h1>
          </div>

          {/* Navigation Links */}
          <div className="navbar-nav justify-content-center w-100 mb-3">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`/${link.toLowerCase()}`} 
                className="nav-link mx-2"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary me-2">
              <FaSearch />
            </button>
            <button className="btn btn-outline-secondary">
              <FaUser />
            </button>
          </div>
        </div>
      </nav>

      {/* Date Header */}
      <div className="text-center py-3 border-bottom">
        <p className="text-muted mb-0">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
