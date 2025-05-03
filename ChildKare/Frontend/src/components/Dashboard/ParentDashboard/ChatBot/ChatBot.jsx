import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  // ✅ Auto-scroll on new message
  useEffect(() => {
    const chatWindow = document.querySelector(".chatbot-window");
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "YES, SADBOY NA SIYA RON SABTA LANG" }]);
    }, 1000);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-page-wrapper">
      <div className="chatbot-container">
        <h2>
          AI Assistant
          <span className="online-status">
            <span className="online-dot"></span> Online
          </span>
        </h2>
        <div className="chatbot-window">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chatbot-message-container ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.sender === "bot" && (
                <img
                  src="https://botnation.ai/site/wp-content/uploads/2022/02/meilleur-chatbot.jpg"
                  alt="bot avatar"
                  className="chatbot-avatar"
                />
              )}
              <div className={`chatbot-message ${msg.sender === "user" ? "chatbot-user" : "chatbot-bot"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
