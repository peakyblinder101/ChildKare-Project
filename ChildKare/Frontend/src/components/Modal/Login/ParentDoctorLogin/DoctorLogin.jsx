import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../LoginStyle/Login.css";

function DoctorLogin({ closeModal }) {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor logging in with", { doctorId, password });

    // After successful login, navigate to the Doctor Dashboard
    navigate("/doctor-dashboard"); // Redirect to Doctor Dashboard
    closeModal(); // Close the modal
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="doctor-login-container">
      <div className="login-container">
        <h1>Doctor Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <input
              type="text"
              placeholder=""
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
            <span>Doctor ID</span>
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

export default DoctorLogin;
