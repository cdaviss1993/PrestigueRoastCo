import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/imgs/PrestigeRoastCoLogo.jpeg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Coffee Brand Logo" className="logo-img" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/brew-guide">Brew Guide</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="navbar-actions">
        <Link to="/cart" className="cart-btn">🛒</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
