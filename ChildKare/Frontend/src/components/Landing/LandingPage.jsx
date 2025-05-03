import { useState, useEffect } from "react";
import "./LandingPage.css";
import Modal from "../Modal/Modal/Modal";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [activeContent, setActiveContent] = useState(1);

  const [loading, setLoading] = useState(true); // 👶 New loading state

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (actionType) => {
    setFormType(actionType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormType("");
  };

  const handleCardClick = (index) => {
    setActiveContent(index);
  };

  const cardData = [
    { number: '01', label: 'Welcome' },
    { number: '02', label: 'ChatBot' },
    { number: '03', label: 'Consult' },
    { number: '04', label: 'Tips' },
  ];

  if (loading) {
    return (
      <div className="loading-screen">
        <img
          src="/src/components/Landing/LandingImage/babycrawl-unscreen.gif"
          alt="Loading..."
          className="crawling-baby"
        />
        <p>Loading ChildKare...</p>
      </div>
    );
  }
  return (  
    <div className="content">

      <div className={`section ${activeContent === 1 ? 'active' : ''}`}>
        
        <div className="content-wrapper">
          <header className="header">
            <div className="logo-container">
              <img
                src="/src/components/Landing/LandingImage/logo5.png"
                alt="Logo"
                className="logo"
              />
              <span className="logo-name">ChildKare</span>
            </div>
            {/*<div className="center-nav">
              <span>About Us</span>
              <span>Our Goals</span>
              <span>Blog</span>
              <span>Child Tips</span>
            </div>*/}
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
                <button className="login-btn" onClick={() => openModal("Login")}>
                  Login
                </button>
              </div>
            </div>
          </div>
          {/* Modal for Role Selection and Login/Register */}
          <Modal
            isModalOpen={isModalOpen}
            closeModal={closeModal} // Pass the reset function to Modal
            formType={formType} // Pass formType to Modal
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className={`section ${activeContent === 2 ? 'active' : ''}`}>
        <div className="content-wrapper">
          <div className="second-content">
              <div className="description">
                <h1>ChatBot Assistance</h1>
                <p>
                  Our intelligent chatbot is available <br/> 
                  24/7, to answer any questions you <br/>
                  may have. Whether youre seeking <br/>
                  advice or need quick information, <br/>
                  the chatbot is always ready to help!
                </p>
              </div>
            </div>
        </div>
      </div>
      
      <div className={`section ${activeContent === 3 ? 'active' : ''}`}>
      <div className="content-wrapper">
          <div className="third-content">
              <div className="description">
                <h1>Consult with Doctor</h1>
                <p>
                Connect directly with trusted healthcare<br/>
                professionals through our secure chat feature. <br/>
                Schedule checkups, ask health-related questions, <br/>
                and get expert advice at your convenience. <br/>
                Doctors can also reach out to you with <br/>
                personalized questions and updates.<br/>
                </p>
              </div>
            </div>
        </div>
      </div>

      <div className={`section ${activeContent === 4 ? 'active' : ''}`}>
      <div className="content-wrapper">
          <div className="fourth-content">
            <div className="description">
              <h1>Helpful Tips</h1>
              <p>
                Our website is packed with informative articles on <br/>
                parenting, health, and baby care. Click Read More <br/> 
                to explore full articles and get expert advice on <br/>
                all things related to motherhood.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="card-container">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`card ${activeContent === index + 1 ? 'active' : ''}`}
            onClick={() => handleCardClick(index + 1)}
          >
            <span>{`${card.number} ${card.label}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
