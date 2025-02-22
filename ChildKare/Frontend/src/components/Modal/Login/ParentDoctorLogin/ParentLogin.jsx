import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../LoginStyle/Login.css";

function ParentLogin({ closeModal }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent logging in with", { username, password });

    // After successful login, navigate to the Parent Dashboard
    navigate("/parent-dashboard"); // Redirect to Parent Dashboard
    closeModal(); // Close the modal
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="parent-login-container">
      <div className="login-container">
        <h1>Parent Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <input
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span>Username</span>
          </div>

          <div className="box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>

            <i className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>

          <a href="#" onClick={handleSubmit}>Login</a>
        </form>
      </div>
    </div>
  );
}

export default ParentLogin;
