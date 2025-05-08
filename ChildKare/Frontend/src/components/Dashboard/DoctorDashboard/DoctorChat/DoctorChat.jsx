import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './DoctorChat.css';

const socket = io('https://8fdsdscs-5000.asse.devtunnels.ms', {
  transports: ['websocket'], // ensure websocket is used
});

function DoctorChat() {
  const currentUserId = 3;
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parents, setParents] = useState([]);
  const [parentName, setParentName] = useState('');
  const chatEndRef = useRef(null); // Ref for the chat container

  const fetchChatHistory = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://8fdsdscs-5000.asse.devtunnels.ms/api/history/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchParentList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/conversationsForDoctors', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setParents(data);
    } catch (error) {
      console.error('Error fetching parent list:', error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender_id: currentUserId,
        receiver_id: selectedUser,
        message,
        created_at: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev, newMessage]);
      socket.emit('send_message', newMessage); // Emit through socket

      try {
        const token = localStorage.getItem('token');
        await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiver_id: selectedUser, message }),
        });
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };

  const handleUserClick = (userId, first_name, last_name) => {
    setSelectedUser(userId);
    setParentName(`${first_name} ${last_name}`);
    setChatHistory([]);
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch data
  useEffect(() => {
    fetchParentList();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);

      // Emit the join event with the doctor's user ID
      socket.emit('join', { userId: currentUserId });
      console.log(`Doctor joined room with userId: ${currentUserId}`);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (selectedUser) fetchChatHistory(selectedUser);
  }, [selectedUser]);

  // Setup socket listeners
  useEffect(() => {
    // Join room using parent ID
    socket.emit('join', { userId: currentUserId });

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setChatHistory((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  // Scroll to the bottom whenever chat history changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="doctor-chat-container">
      <div className="doctor-chat">
        <div className="chat-container">
          <div className="parent-user-list">
            <h2>Parents</h2>
            <ul>
              {parents.map((parent) => (
                <li
                  key={parent.id}
                  onClick={() => handleUserClick(parent.user_id, parent.first_name, parent.last_name)}
                  className={selectedUser === parent.id ? 'selected' : ''}
                >
                  <span className="user-avatar-placeholder">
                    {parent.first_name} {parent.last_name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

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
              <div ref={chatEndRef} /> {/* Reference to scroll to the bottom */}
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