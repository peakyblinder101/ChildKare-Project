import  { useState } from 'react';
import { FaUserAlt, FaComments, FaCalendarAlt, FaHome } from 'react-icons/fa';
import DashboardLayout from '../DashboardLayout';
import ParentHome from './ParentHome/ParentHome';
import ParentProfile from './ParentProfile/ParentProfile';
import ChatBot from './ChatBot/ChatBot';
import ParentChat from './ParentChat/ParentChat';
import ParentSchedule from './ParentSchedule/ParentSchedule';

function ParentDashboard() {
  const [content, setContent] = useState('Home'); // Default content when page loads

  // Define sidebar items for Parent Dashboard
  const sidebarItems = [
    { label: 'Home', icon: FaHome },
    { label: 'Profile', icon: FaUserAlt },
    { label: 'ChatBot', icon: FaComments },
    { label: 'Consult', icon: FaComments },
    { label: 'Appointment', icon: FaCalendarAlt },
  ];

  // Callback to handle content change when sidebar menu item is clicked
  const handleMenuItemClick = (item) => {
    setContent(item.label); // Set the clicked menu item's label
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      onMenuItemClick={handleMenuItemClick}
      defaultSelected="Home"  // Pass the default selected item to the layout
    >
      <div className="content">
        {content === 'Home' && <ParentHome />}
        {content === 'Profile' && <ParentProfile />}
        {content === 'ChatBot' && <ChatBot />}
        {content === 'Consult' && <ParentChat />}
        {content === 'Appointment' && <ParentSchedule />}
      </div>
    </DashboardLayout>
  );
}

export default ParentDashboard;
