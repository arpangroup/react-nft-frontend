import React,{ useState, useEffect } from 'react'
import './navbarV2.css'
import { RiMenu3Line, RiCloseLine, RiHome2Line, RiInformationLine, RiSettings3Line, RiNotificationLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link, useLocation, useNavigate } from "react-router-dom";

const Menu = () => (
  <>
     <Link to="/"><p>Explore</p> </Link>
     <p>My Items</p>
    
  </>
 )

const NavbarV2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
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
  if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot') {
    return null;
  }

  return (
    <>
      <div className="navbar">
        <button className="menu-btn" onClick={toggleSidebar}>
          &#9776;
        </button>
        <div className="logo">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAMAAACrZuH4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB1UExURUdwTNAat9QZsNYaq+wUht8Znd4Xn+wUhM4bu80bu84bvewVgusUhdcaqukUiOkUhuoVhdAauOsUhNUZr9wXod8Xm+IWldgYqOUVkNEategUihsaIc4buisZK34YXUwZP2kYUMkXlYwYadIVgLIWdKgYgqEWYDCLd4wAAAASdFJOUwDf75XnIDN/gH1fYKfPz5Bgr9mCYawAAAFVSURBVDjLddTbkoMgDABQ67Z2p92rd0wBQe3/f+IGJAasy1M7cyYJITHL/Cm+v85lOQxD37dt0zR1/vl2yfhcPkp/WKDpOjbFuSTRUwwEXXcqQgQCLOrakypfo0TAJ1mFA1V1cuCnfBUNCfEeh4iv4stAIHIss2QxKS1Bamu2LEIU2Z2FlRCO2oC4ZdcNjAB6nloz44+RsmAhVwZyDoUu0pFqJ54gp61QI2FZxYOFBht1VIFek7CYQMY9xyBmF+MJOunoCHYXQ4FKBP4/EJxkE484y5gIDctOYKVTPByuUpEIvK2KyrCgq72YXRASeFn7InzXg3BdX7sRCZwN92Czacyi3cuFECjuPD6KHl/abhM3miA/X5P1E6QMPSyKgqZwSLrBwo3y9X/hk9Aox1MciRNv1MEioAgb5bYyWaaaZpS20m32wboJ8ZtsP34dkjLw6xAC/AE0NFJK3rXLDAAAAABJRU5ErkJggg=="
            alt="App Logo" />
            <span className="logo-title">TreasureApp</span>
        </div>
        <div className="profile-icon">
          <img src="https://image.treasurenft.xyz/icon/icon_notice_02.png" alt="Profile" />
        </div>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">TreasureApp</span>
        </div>

        {/* <hr className="sidebar-separator" /> */}

        <ul className="sidebar-menu">
           <li className={isActive("/") ? "active" : ""}>
              <Link to="/">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Explore</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/earn") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Earn</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/reserve") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Reserve</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/assets") ? "active" : ""}>
              <Link to="/stake">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Assets</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/create") ? "active" : ""}>
              <Link to="/create">
                <div className="menu-content">
                  <RiHome2Line className="sidebar-icon" />
                  <span className="menu-label">Create NFT</span>
                </div>
              </Link>
            </li>

            <hr className="sidebar-separator" />
            

            
            
            <li className={isActive("/alerts") ? "active" : ""}>
              <Link to="/alerts">
                <div className="menu-content">
                  <RiNotificationLine className="sidebar-icon" />
                  <span className="menu-label">Alerts</span>
                </div>
                <span className="badge">5</span>
              </Link>
            </li>

             <li className={isActive("/tree") ? "active" : ""}>
              <Link to="/level">
                <div className="menu-content">
                  <RiNotificationLine className="sidebar-icon" />
                  <span className="menu-label">Level</span>
                </div>
                <span className="badge">5</span>
              </Link>
            </li>

            <hr className="sidebar-separator" />

             <li className={isActive("/settings") ? "active" : ""}>
              <Link to="/settings">
                <div className="menu-content">
                  <RiSettings3Line className="sidebar-icon" />
                  <span className="menu-label">Settings</span>
                </div>
              </Link>
            </li>

            <li className={isActive("/about") ? "active" : ""}>
              <Link to="/about">
                <div className="menu-content">
                  <RiInformationLine className="sidebar-icon" />
                  <span className="menu-label">About</span>
                </div>
              </Link>
            </li>

          






          {/* <li className={isActive("/") ? "active" : ""}>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/about">About</Link>
          </li>
          <li>
            <RiMenu3Line className="sidebar-icon" />
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>

        <hr className="sidebar-separator" />

        <div className="sidebar-footer">
          <p>&copy; 2025 TreasureApp</p>
        </div>
      </div>

      {/* {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>} */}
    </>
  );
};


export default NavbarV2
