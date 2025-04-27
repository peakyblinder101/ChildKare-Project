import { useState, useEffect } from 'react';
import './ParentChat.css';

function ParentChat() {
  const [selectedUser, setSelectedUser] = useState(3); // Default to the doctor (ID 3)
  const [message, setMessage] = useState(''); // To handle the input message
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  const users = [
    { id: 3, name: 'Dr. Alice Johnson', avatar: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?t=st=1744045541~exp=1744049141~hmac=e189b3855db8a8edb4e2e293136c80e76880d6b0c5aa4a9c08fd374361bc076a&w=826', status: 'offline' },
    { id: 4, name: 'You', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg?t=st=1744045266~exp=1744048866~hmac=e2967ab7d452a9a45b4ce3ff6270c3c8e8d720c26923a41fd9f5a9dbde2c65d2&w=740', status: 'online' },
  ];

  // Fetch chat history when the selected user changes
  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const token = localStorage.getItem("token"); // assuming you saved it after login
  
        const response = await fetch(`https://8fdsdscs-5000.asse.devtunnels.ms/api/history/${selectedUser}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,// Add the token if needed
          },
        });
        const data = await response.json();
        setChatHistory(data); // Update the chat history state with the response
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    fetchChatHistory();
  }, [selectedUser]); // Re-fetch the history whenever the selectedUser changes

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = { sender_id: 4, receiver_id: selectedUser, message, created_at: new Date().toISOString() };
      const token = localStorage.getItem("token"); // assuming you saved it after login
  
      // Append new message to chat history
      setChatHistory(prevChatHistory => [...prevChatHistory, newMessage]);

      // Send the message to the API
      try {
        const response = await fetch('http://localhost:5000/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Add the token if needed
          },
          body: JSON.stringify({
            receiver_id: selectedUser, // ID of the receiver (doctor or user)
            message, // The message content
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        const data = await response.json(); // Optional: process response if needed
        console.log('Message sent:', data);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="parent-chat-container">
      <div className="parent-chat">
        <div className="chat-container">
          {/* Left Side - User List */}
          <div className="doctor-user-list">
            <h2>Doctor List</h2>
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={selectedUser === user.id ? 'selected' : ''}
                >
                  <div className="user-avatar-container">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                    {user.status === 'online' && <div className="status-dot"></div>} {/* Show dot only if user is online */}
                  </div>
                  {user.name} {/* Display name */}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Chat */}
          <div className="chat-window">
            <h2>
              <img
                src={users.find((user) => user.id === selectedUser)?.avatar}
                alt={users.find((user) => user.id === selectedUser)?.name}
                className="user-avatar"
              />
              Chat with {users.find((user) => user.id === selectedUser)?.name}
            </h2>
            <div className="messages">
              {loading ? (
                <p>Loading...</p> // Show loading text while fetching
              ) : (
                chatHistory.map((messageObj, index) => {
                  const user =
                    messageObj.sender_id === 4
                      ? users.find((user) => user.id === 4) // For your user
                      : users.find((user) => user.id === 3); // For the doctor
                  return (
                    <div
                      key={index}
                      className={`message ${messageObj.sender_id === 4 ? 'message-sender' : 'message-receiver'}`}
                    >
                      <div className="message-header">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="user-avatar-small"
                        />
                        <span className="user-name">
                          {messageObj.sender_id === 4 ? 'You' : `Dr. ${user.name}`}
                        </span>
                      </div>
                      <div className="message-text">
                        <p>{messageObj.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="input-section">
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

export default ParentChat;
