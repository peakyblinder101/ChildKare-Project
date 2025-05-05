import { useState, useEffect } from 'react';
import './ParentChat.css';

function ParentChat() {
  const currentUserId = 4; // Parent ID
  const [doctorId, setDoctorId] = useState(3); // Default Doctor ID, can be dynamic
  const [selectedUser, setSelectedUser] = useState(doctorId); // Always chatting with the doctor
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]); // Store doctor list
  const [doctorName, setDoctorName] = useState(''); // Store selected doctor's name

  const fetchChatHistory = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
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

  const fetchDoctorList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/conversations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setDoctors(data); // Store the fetched doctors
    } catch (error) {
      console.error('Error fetching doctors list:', error);
    }
  };

  useEffect(() => {
    fetchDoctorList(); // Fetch doctor list on component mount
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchChatHistory(selectedUser); // Fetch chat history for the selected user
    }
  }, [selectedUser]);

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
        const token = localStorage.getItem("token");
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

  const handleUserClick = (userId, first_name, last_name) => {
    setSelectedUser(userId);
    console.log(`Selected user ID: ${userId}`); // Log the selected doctor ID
    setDoctorName(`${first_name} ${last_name}`); // Set the selected doctor's name
    setChatHistory([]); // Clear previous chat history when switching users
  };

  return (
    <div className="parent-chat-container">
      <div className="parent-chat">
        <div className="chat-container">
          {/* Left Side - Doctor List */}
          <div className="doctor-user-list">
            <h2>Doctors</h2>
            <ul>
              {doctors.map((doctor) => (
                <li
                  key={doctor.id}
                  onClick={() => handleUserClick(doctor.user_id, doctor.first_name, doctor.last_name)}
                  className={selectedUser === doctor.id ? 'selected' : ''}
                >
                  <span className="user-avatar-placeholder">{doctor.first_name} {doctor.last_name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Chat window */}
          <div className="chat-window">
            <h2>Chat with {doctorName}</h2>
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

export default ParentChat;
