/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../../hooks/useLogin";  // Assuming the useLogin hook is in the hooks folder
import "../LoginStyle/Login.css";
import axios from "axios";
import { useEffect } from "react"; // make sure useEffect is imported



function ParentLogin({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [children, setChildren] = useState([]);




  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchChildren = async () => {
        try {
        const token = localStorage.getItem("token"); // assuming you saved it after login
  
          const response = await axios.get(`http://localhost:5000/api/children`, {
            headers: {
              Authorization: `Bearer ${token}`, // 🔥 Add the token here
            },
          });
  
          setChildren(response.data); // Save the data
        } catch (error) {
          console.error("Failed to fetch children:", error);
          alert("Failed to fetch children.");
        }
      };
  
      fetchChildren();
    }
  }, [isLoggedIn]);
  

  // Use the useLogin hook
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the login function from useLogin
    const { success, error: loginError } = await login(email, password);

    if (success) {
      setIsLoggedIn(true); // Show child selection
    } else {
      // Handle login failure (e.g., show error)
      alert(loginError || "Login failed. Please check your credentials.");
    }
  };

  const handleChildSelect = (child) => {
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
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <div className="child-selection">
          <h3>Select a Child to Continue:</h3>
          <div className="child-options">
            {children.map((child) => (
              <div
                key={child.id}
                className="child-card"
                onClick={() => handleChildSelect(child)}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "10px 0",
                }}
              >
                <p>
                  <strong>Baby {child.first_name}</strong>
                </p>
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
