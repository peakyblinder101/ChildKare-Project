import React, { useState } from 'react';
import { FaUserMd, FaUpload, FaComments, FaCalendarAlt } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';

function DoctorDashboard() {
  const [content, setContent] = useState('Profile'); // Default content when page loads

  // Define sidebar items for Doctor Dashboard
  const sidebarItems = [
    { label: 'Profile', icon: FaUserMd },
    { label: 'Upload Tips', icon: FaUpload },
    { label: 'Chat', icon: FaComments },
    { label: 'Appointment', icon: FaCalendarAlt },
  ];

  // Callback to handle content change when sidebar menu item is clicked
  const handleMenuItemClick = (item) => {
    setContent(item.label); // Set the clicked menu item's label
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} 
      onMenuItemClick={handleMenuItemClick} 
      defaultSelected="Profile">
      <div className="content">
        {content === 'Profile' && <h1>Doctor Profile Content</h1>}
        {content === 'Upload Tips' && <h1>Upload Tips Content</h1>}
        {content === 'Doctor Chat' && <h1>Doctor Chat Content</h1>}
        {content === 'Accept Schedule' && <h1>Accept Schedule Content</h1>}
      </div>
    </DashboardLayout>
  );
}

export default DoctorDashboard;
