import React, { useState } from 'react';
import './ParentChat.css';

function ParentChat() {
  const [selectedUser, setSelectedUser] = useState(1); // Default to the first user
  const [message, setMessage] = useState(''); // To handle the input message
  const [chatHistory, setChatHistory] = useState({
    1: [
      { userId: 1, message: 'Hello, Dr. John! My baby seems a bit feverish today.' },
      { userId: 0, message: 'Hi Dr. John, how should I care for him? He\'s feeling warm.' }, // Your message to Dr. John
      { userId: 1, message: 'I suggest you monitor his temperature. Try giving him some fever medicine.' },
      { userId: 0, message: 'Thank you! I\'ll do that and make sure to keep him hydrated.' },
    ],
    2: [
      { userId: 2, message: 'Dr. Jane, my baby is having trouble sleeping. What can I do?' },
      { userId: 0, message: 'Has she been feeding well? Sometimes, discomfort can cause difficulty sleeping.' },
      { userId: 2, message: 'She\'s been eating okay, but it\'s been hard to get her to sleep.' },
      { userId: 0, message: 'Try swaddling her with soft fabrics and play some white noise. That usually helps.' },
    ],
    3: [
      { userId: 3, message: 'Dr. Alice, I\'ve noticed my baby is not gaining enough weight. Should I be concerned?' },
      { userId: 0, message: 'What is his current weight? He may just need more time, but I\'ll advise some changes.' },
      { userId: 3, message: 'He\'s been feeding well, but I feel like he\'s not putting on weight.' },
      { userId: 0, message: 'Make sure you are feeding him regularly and consult me if the weight continues to drop.' },
    ],
    4: [
      { userId: 4, message: 'Dr. Bob, I\'m worried because my baby hasn’t been making eye contact.' },
      { userId: 0, message: 'Has he been showing any other signs of developmental delay?' },
      { userId: 4, message: 'No, he seems to be developing normally in all other aspects.' },
      { userId: 0, message: 'It might be a developmental stage, but let’s keep an eye on it. We can discuss again if needed.' },
    ],
  });

  const users = [
    { id: 1, name: 'John Doe', avatar: 'https://img.freepik.com/free-photo/bearded-doctor-glasses_23-2147896187.jpg?t=st=1744045616~exp=1744049216~hmac=16b880acba8eaa0e14475e9fb9534211355318917070fc8023f76228f40ea775&w=826', status: 'online' },
    { id: 2, name: 'Jane Smith', avatar: 'https://img.freepik.com/free-photo/portrait-female-health-worker_23-2148980790.jpg?t=st=1744045671~exp=1744049271~hmac=00cd6b05446088cd41600429a9ee8fadab55320cd1a3fc3c30c689ae93c2abb0&w=740', status: 'offline' },
    { id: 3, name: 'Alice Johnson', avatar: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?t=st=1744045541~exp=1744049141~hmac=e189b3855db8a8edb4e2e293136c80e76880d6b0c5aa4a9c08fd374361bc076a&w=826', status: 'offline' },
    { id: 4, name: 'Bob Brown', avatar: 'https://img.freepik.com/free-photo/black-nurse-their-workspace_52683-100578.jpg?t=st=1744045779~exp=1744049379~hmac=6f3431ce18493b7075ed9962d3a44c2dfd8f09748a3dc0614c02692464e5f279&w=1380', status: 'online' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prevChatHistory) => ({
        ...prevChatHistory,
        [selectedUser]: [
          ...prevChatHistory[selectedUser],
          { userId: 0, message }, // '0' represents the mother (You)
        ],
      }));
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="parent-chat-container">
      <div className="parent-chat">
        <div className="chat-container">
          {/* Left Side - User List */}
          <div className="user-list">
            <h2>User List</h2>
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
                  Dr. {user.name} {/* Added Dr. prefix */}
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
              Chat with Dr. {users.find((user) => user.id === selectedUser)?.name} {/* Added Dr. prefix */}
            </h2>
            <div className="messages">
              {chatHistory[selectedUser]?.map((messageObj, index) => {
                const user =
                  messageObj.userId === 0
                    ? { name: 'You', avatar: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg?t=st=1744045266~exp=1744048866~hmac=e2967ab7d452a9a45b4ce3ff6270c3c8e8d720c26923a41fd9f5a9dbde2c65d2&w=740' }
                    : users.find((user) => user.id === messageObj.userId);
                return (
                  <div
                    key={index}
                    className={`message ${
                      messageObj.userId === 0 ? 'message-sender' : 'message-receiver'
                    }`}
                  >
                    <div className="message-header">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="user-avatar-small"
                      />
                      <span className="user-name">
                        {messageObj.userId === 0
                          ? 'You '
                          : `Dr. ${user.name}`} {/* Added Dr. prefix */}
                      </span>
                    </div>
                    <div className="message-text">
                      <p>{messageObj.message}</p>
                    </div>
                  </div>
                );
              })}
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
