import React, { useState, useEffect } from 'react';
import './DoctorChat.css';

function DoctorChat() {
  const [selectedUser, setSelectedUser] = useState(1);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState({
    1: [
      { userId: 1, message: 'Hello, Dr. John! My baby seems a bit feverish today.' },
      { userId: 0, message: 'Hi, how should I care for him? He’s feeling warm.' },
      { userId: 1, message: 'I suggest you monitor his temperature. Try giving him some fever medicine.' },
      { userId: 0, message: 'Thank you! I’ll do that and make sure to keep him hydrated.' },
    ],
  });

  const users = [
    { id: 1, name: 'Emily Johnson', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg', status: 'online' },
    { id: 2, name: 'Laura Smith', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg', status: 'offline' },
    { id: 3, name: 'Sophia Brown', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg', status: 'offline' },
    { id: 4, name: 'Megan Lee', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg', status: 'online' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => ({
        ...prev,
        [selectedUser]: [...prev[selectedUser], { userId: 0, message }], // Add user message
      }));
      setMessage('');

      // Simulate a bot response after a short delay
      setTimeout(() => {
        setChatHistory(prev => ({
          ...prev,
          [selectedUser]: [
            ...prev[selectedUser],
            { userId: 1, message: 'Got it! I’ll help you with that.' }, // Bot message
          ],
        }));
      }, 1000);
    }
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    const chatWindow = document.querySelector('.doctor-chat-messages');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="doctor-chat-container">
      <div className="doctor-chat">
        <div className="doctor-chat-wrapper">
          <div className="parent-user-list">
            <h2>Parent List</h2>
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={selectedUser === user.id ? 'doctor-chat-selected' : ''}
                >
                  <div className="doctor-chat-avatar-container">
                    <img src={user.avatar} alt={user.name} className="doctor-chat-avatar" />
                    {user.status === 'online' && <div className="doctor-chat-status-dot"></div>}
                  </div>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="doctor-chat-window">
            <h2>
              <img
                src={users.find((u) => u.id === selectedUser)?.avatar}
                alt={users.find((u) => u.id === selectedUser)?.name}
                className="doctor-chat-avatar"
              />
              Chat with {users.find((u) => u.id === selectedUser)?.name}
            </h2>
            <div className="doctor-chat-messages">
              {chatHistory[selectedUser]?.map((msg, index) => {
                const user =
                  msg.userId === 0
                    ? {
                        name: 'You',
                        avatar: 'https://img.freepik.com/free-photo/bearded-doctor-glasses_23-2147896187.jpg',
                      }
                    : users.find((u) => u.id === msg.userId);
                return (
                  <div
                    key={index}
                    className={`doctor-chat-message ${
                      msg.userId === 0 ? 'doctor-chat-message-sender' : 'doctor-chat-message-receiver'
                    }`}
                  >
                    <div className="doctor-chat-message-header">
                      <img src={user.avatar} alt={user.name} className="doctor-chat-avatar-small" />
                      <span className="doctor-chat-user-name">
                        {msg.userId === 0 ? 'You' : user.name}
                      </span>
                    </div>
                    <div className="doctor-chat-message-text">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="doctor-chat-input-section">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorChat;
