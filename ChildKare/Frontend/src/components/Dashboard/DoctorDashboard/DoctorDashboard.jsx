import React, { useState } from 'react';
import { FaUserMd,FaHome, FaComments } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';
import DoctorHome from './DoctorHome/DoctorHome';
import DoctorChat from './DoctorChat/DoctorChat';
import DoctorProfile from './DoctorProfile/DoctorProfile';


function DoctorDashboard() {
  const [content, setContent] = useState('Home'); // Default content when page loads

  // Define sidebar items for Doctor Dashboard
  const sidebarItems = [
    { label: 'Home', icon: FaHome },
    { label: 'Chat', icon: FaComments },
    { label: 'Profile', icon: FaUserMd },
  ];

  // Callback to handle content change when sidebar menu item is clicked
  const handleMenuItemClick = (item) => {
    setContent(item.label); // Set the clicked menu item's label
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} 
      onMenuItemClick={handleMenuItemClick} 
      defaultSelected="Home">
      <div className="content">
        {content === 'Home' && <DoctorHome />}
        {content === 'Chat' && <DoctorChat/>}
        {content === 'Profile' && <DoctorProfile />}
      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
