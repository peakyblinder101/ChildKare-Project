import React, { useState } from "react";
import "./LandingPage.css";
import Modal from "../Modal/Modal/Modal";

function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [formType, setFormType] = useState(""); // State to manage form type (Login/Register)

  // Function to open the modal with the appropriate form (Login/Register)
  const openModal = (actionType) => {
    setFormType(actionType); // Set the form type to "Login" or "Register"
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal and reset formType state
  const closeModal = () => {
    setIsModalOpen(false);
    setFormType(""); // Reset the form type when closing the modal
  };

  return (
    <div className="Landing-wrapper">
      <header className="header">
        <div className="logo-container">
          <img
            src="/src/components/Landing/LandingImage/logo5.png"
            alt="Logo"
            className="logo"
          />
          <span className="logo-name">ChildKare</span>
        </div>

        <div className="center-nav">
          <span>About Us</span>
          <span>Our Goals</span>
          <span>Blog</span>
          <span>Child Tips</span>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => openModal("Login")}>
            Login
          </button>
        </div>
      </header>

      <div className="first-content">
        <div className="description">
          <h1>Welcome to ChildKare</h1>
          <p>
            ChildKare is dedicated to providing the best care <br />
            for children. Our mission is to ensure every child <br />
            receives the attention and love they deserve. <br />
            Join us in making a difference!
          </p>
          <div className="auth-buttons">
            <button className="register-btn" onClick={() => openModal("Register")}>
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Second Content Section */}
      <div className="second-content">
        <div className="card" style={{ "--clr": "#009688" }}>
          <div className="img-box">
            <img src="/src/components/Landing/LandingImage/logo5.png" alt="Development" />
          </div>
          <div className="content">
            <h2>Development</h2>
            <p>
              As a front-end developer, I have extensive experience in everything from simple landing pages to extensive large-scale projects for hotels and resorts. There is no project too big or too small.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="card" style={{ "--clr": "#009688" }}>
          <div className="img-box">
            <img src="/src/components/Landing/LandingImage/logo5.png" alt="Development" />
          </div>
          <div className="content">
            <h2>Development</h2>
            <p>
              As a front-end developer, I have extensive experience in everything from simple landing pages to extensive large-scale projects for hotels and resorts. There is no project too big or too small.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="card" style={{ "--clr": "#FF3E7F" }}>
          <div className="img-box">
            <img src="/src/components/Landing/LandingImage/logo5.png" alt="Design" />
          </div>
          <div className="content">
            <h2>Design</h2>
            <p>
              As a graphic designer I have worked in many industries on everything from apparel to branding for companies large and small. I can help with full re-branding, or building awareness for a brand that already exists.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div className="card" style={{ "--clr": "#03A9F4" }}>
          <div className="img-box">
            <img src="/src/components/Landing/LandingImage/logo5.png" alt="Playground" />
          </div>
          <div className="content">
            <h2>Playground</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, hic? Magnam eum error saepe doloribus corrupti repellat quisquam alias doloremque!
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>


      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2025 ChildKare. All rights reserved.</span>
          <div className="footer-links">
            <a href="#privacy-policy">Privacy Policy</a>
            <a href="#terms-of-service">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>

      {/* Modal for Role Selection and Login/Register */}
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal} // Pass the reset function to Modal
        formType={formType} // Pass formType to Modal
      />
    </div>
  );
}

export default LandingPage;
