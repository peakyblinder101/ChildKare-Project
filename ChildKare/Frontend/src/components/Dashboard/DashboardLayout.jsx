import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

function DashboardLayout({ sidebarItems, onMenuItemClick, children, defaultSelected }) {
  const [selectedItem, setSelectedItem] = useState(defaultSelected); // Set initial selected item to the defaultSelected
  const navigate = useNavigate();

  useEffect(() => {
    // Set the initial selected item when the defaultSelected prop changes
    setSelectedItem(defaultSelected);
  }, [defaultSelected]);

  // Handle menu item click
  const handleMenuItemClick = (item) => {
    setSelectedItem(item.label); // Use item.label to track selected item
    onMenuItemClick(item); // Pass the selected item to the parent
  };

  // Handle logout
  const handleLogout = () => {
    // Example: Clear authentication-related data (uncomment if needed)
    // localStorage.removeItem('auth_token');
    // sessionStorage.clear();
    
    // Navigate back to the landing page (or login page)
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.label}
              onClick={() => handleMenuItemClick(item)}
              className={selectedItem === item.label ? 'active' : ''} // Compare by label
            >
              {item.icon && <div className="icon">{<item.icon />}</div>} {/* Add the icon class here */}
              {item.label}
            </li>
          ))}
        </ul>
        {/* Log Out Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {children} {/* Render the main content based on the selected menu item */}
      </div>
    </div>
  );
}

export default DashboardLayout;
