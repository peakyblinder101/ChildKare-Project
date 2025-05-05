import { useState, useEffect } from 'react';
import './DoctorChat.css';

function DoctorChat() {
  const currentUserId = 3; // Doctor ID
  const [selectedUser, setSelectedUser] = useState(null); // Selected parent ID
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]); // Store parent list
  const [parentName, setParentName] = useState(''); // Store selected parent's name

  // Fetch chat history for the selected parent
  const fetchChatHistory = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://8fdsdscs-5000.asse.devtunnels.ms/api/history/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch parent list
  const fetchParentList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/conversationsForDoctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setParents(data); // Store the fetched parents
    } catch (error) {
      console.error('Error fetching parent list:', error);
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender_id: currentUserId,
        receiver_id: selectedUser,
        message,
        created_at: new Date().toISOString(),
      };

      // Append locally
      setChatHistory((prev) => [...prev, newMessage]);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: selectedUser,
            message,
          }),
        });

        if (!response.ok) throw new Error('Failed to send message');
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };

  // Handle parent selection
  const handleUserClick = (userId, first_name, last_name) => {
    setSelectedUser(userId);
    console.log(`Selected user ID: ${userId}`); // Log the selected parent ID
    setParentName(`${first_name} ${last_name}`); // Set the selected parent's name
    setChatHistory([]); // Clear previous chat history when switching users
  };

  // Fetch parent list on component mount
  useEffect(() => {
    fetchParentList();
  }, []);

  // Fetch chat history when a parent is selected
  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory(selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="doctor-chat-container">
      <div className="doctor-chat">
        <div className="chat-container">
          {/* Left Side - Parent List */}
          <div className="parent-user-list">
            <h2>Parents</h2>
            <ul>
              {parents.map((parent) => (
                <li
                  key={parent.id}
                  onClick={() => handleUserClick(parent.user_id, parent.first_name, parent.last_name)}
                  className={selectedUser === parent.id ? 'selected' : ''}
                >
                  <span className="user-avatar-placeholder">{parent.first_name} {parent.last_name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Chat Window */}
          <div className="chat-window">
            <h2>Chat with {parentName}</h2>
            <div className="messages">
              {loading ? (
                <p>Loading...</p>
              ) : (
                chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.sender_id === currentUserId ? 'message-sender' : 'message-receiver'}`}
                  >
                    <div className="message-header">
                      <span className="user-name">
                        {msg.sender_id === currentUserId ? 'You' : msg.sender_id}
                      </span>
                    </div>
                    <div className="message-text">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                ))
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

export default DoctorChat;
