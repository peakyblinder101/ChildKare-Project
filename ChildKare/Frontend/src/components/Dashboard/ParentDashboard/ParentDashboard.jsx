import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaComments, FaCalendarAlt, FaHome } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';
import ParentHome from './ParentHome/ParentHome';
import ParentProfile from './ParentProfile/ParentProfile';
import ChatBot from './ChatBot/ChatBot';
import ParentChat from './ParentChat/ParentChat';
import ParentSchedule from './ParentSchedule/ParentSchedule';

function ParentDashboard() {
  const [content, setContent] = useState('Parent Home'); // Default content when page loads

  // Define sidebar items for Parent Dashboard
  const sidebarItems = [
    { label: 'Parent Home', icon: FaHome },
    { label: 'Parent Profile', icon: FaUserAlt },
    { label: 'ChatBot', icon: FaComments },
    { label: 'Parent Chat', icon: FaComments },
    { label: 'Parent Schedule', icon: FaCalendarAlt },
  ];

  // Callback to handle content change when sidebar menu item is clicked
  const handleMenuItemClick = (item) => {
    setContent(item.label); // Set the clicked menu item's label
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      onMenuItemClick={handleMenuItemClick}
      defaultSelected="Parent Home"  // Pass the default selected item to the layout
    >
      <div className="content">
        {content === 'Parent Home' && <ParentHome />}
        {content === 'Parent Profile' && <ParentProfile />}
        {content === 'ChatBot' && <ChatBot />}
        {content === 'Parent Chat' && <ParentChat />}
        {content === 'Parent Schedule' && <ParentSchedule />}
      </div>
    </DashboardLayout>
  );
}

export default ParentDashboard;
