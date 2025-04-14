import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../LoginStyle/Login.css";

function ParentLogin({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const dummyChildren = [
    { id: 1, firstname: "John", lastName: "Smith", gender: "Male", weight: "3.5kg", age: 6 },
    { id: 2, firstname: "Jane", lastName: "Smith", gender: "Female", weight: "3.2kg", age: 5 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent logging in with", { email, password });

    // Simulate login success
    setIsLoggedIn(true); // Show child selection
  };

  const handleChildSelect = (child) => {
    console.log("Selected child:", child);
    localStorage.setItem("selectedChild", JSON.stringify(child));
    closeModal(); // Close modal
    navigate("/parent-dashboard"); // Navigate to dashboard
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="parent-login-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h1>Parent Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="box">
            <input type="email" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>Email</span>
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
      ) : (
        <div className="child-selection">
          <h3>Select a Child to Continue:</h3>
          <div className="child-options">
            {dummyChildren.map((child) => (
              <div
                key={child.id}
                className="child-card"
                onClick={() => handleChildSelect(child)}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "10px 0"
                }}
              >
                <p><strong>Baby {child.firstname}</strong></p>
                <p>Gender: {child.gender}</p>
                <p>Weight: {child.weight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentLogin;
