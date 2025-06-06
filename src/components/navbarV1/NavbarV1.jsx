import React,{ useState, useEffect } from 'react'
import './navbarV1.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
    
  </>
 )

const NavbarV1 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    setUser(false);
    navigate('/login');
  };

  const handleLogin = () => {
    setUser(true);
    navigate('/');
  };

  // Redirect to /login if not logged in and not already on /login
  /* useEffect(() => {
    if (!user && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [user, location.pathname, navigate]); */

  // Hide Navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <>
      <div className="navbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <div className="logo">
          {/* <img
            src="https://image.treasurenft.xyz/img/img_logo_home.png"
            alt="App Logo" /> */}
            <span className="logo-title">TreasureApp</span>
        </div>
        <div className="profile-icon">
          <img src="https://image.treasurenft.xyz/icon/icon_notice_02.png" alt="Profile" />
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};


export default NavbarV1
