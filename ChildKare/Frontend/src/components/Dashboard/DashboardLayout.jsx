import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout({ sidebarItems, onMenuItemClick, children, defaultSelected }) {
  const [selectedItem, setSelectedItem] = useState(defaultSelected);
  const [sidebarVisible, setSidebarVisible] = useState(true); // Default to true on large screens
  const [sidebarWidth, setSidebarWidth] = useState(0); // Track the width of the sidebar
  const sidebarRef = useRef(null); // Create a ref for the sidebar
  const navigate = useNavigate();

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item.label);
    onMenuItemClick(item);
  };

  // Handle logout
  const handleLogout = () => {
    // Example: Clear authentication-related data (uncomment if needed)
    // localStorage.removeItem('auth_token');
    // sessionStorage.clear();
    
    // Navigate to the landing page (or login page)
    navigate('/');
  };

  // Sample user data (for testing role-based rendering)
  const role = 'Mother'; // Dynamic role ('Mother' or 'Doctor')
  const userName = role === 'Mother' ? 'Franzie Williams' : 'Nonie Martin';
  const profileImage = '/src/components/Landing/LandingImage/logo5.png';

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarVisible((prevState) => {
      const newState = !prevState;
      return newState;
    });
  };

  // Track sidebar width using ResizeObserver
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === sidebarRef.current) {
          // Update the sidebar width when a change is detected
          setSidebarWidth(entry.contentRect.width);
          console.log(`Sidebar width: ${entry.contentRect.width}px`);
        }
      });
    });

    // Observe the sidebar element
    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    // Clean up the ResizeObserver on unmount
    return () => {
      if (sidebarRef.current) {
        resizeObserver.unobserve(sidebarRef.current);
      }
    };
  }, []);

  // Handle window resize to show/hide sidebar automatically based on screen width
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const sidebar = sidebarRef.current;
      const width = sidebar.offsetWidth;
      console.log(`Sidebar width on page load: ${width}px`);
      setSidebarWidth(width); // Store width in state if needed
    });
  
    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }
  
    return () => {
      if (sidebarRef.current) {
        resizeObserver.unobserve(sidebarRef.current);
      }
    };
  }, []);
  

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}
      >
        <div className="logo-image-container">
          <img src="/src/components/Landing/LandingImage/logo5.png" alt="ChildKare Logo" className="logo" />
          <h2>ChildKare</h2>
        </div>

        {/* User Profile Section */}
        <div className="user-profile">
          <div className="profile-circle">
            <img src={profileImage} alt="User Profile" className="profile-image" />
          </div>
          <p className="user-role">{`Hello ${role}`}</p>
          <p className="user-name">{userName}</p>
        </div>

        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleMenuItemClick(item)}
              className={selectedItem === item.label ? 'active' : ''}
            >
              {item.icon && <div className="icon">{<item.icon />}</div>}
              {item.label}
            </li>
          ))}
        </ul>
        
        {/* Logout Button Container */}
        <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Hamburger Icon (visible on smaller screens) */}
      <div className="hamburger" onClick={toggleSidebar}>
        <span>&#9776;</span>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
