import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css'; 

function DashboardLayout({ sidebarItems, onMenuItemClick, children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleMenuItemClick = (item) => {
    setSelectedItem(item); // Highlight the clicked item
    onMenuItemClick(item); // Callback for updating content based on the menu
  };

  // Handle logout
  const handleLogout = () => {
    // Clear any authentication-related data
    // For example, you can clear localStorage or sessionStorage:
    // localStorage.removeItem('auth_token');
    // sessionStorage.clear();

    // Navigate back to the landing page
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
            className={selectedItem === item ? 'active' : ''}
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
