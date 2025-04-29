/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import "./Modal.css";
// Parent
import ParentLogin from "../Login/ParentDoctorLogin/ParentLogin";
import ParentRegister from "../Register/ParentReg/ParentRegister";
// Doctor
import DoctorLogin from "../Login/ParentDoctorLogin/DoctorLogin";
import DoctorRegister from "../Register/DoctorReg/DoctorRegister";

import parentImage from "../Modal/ModalImage/parent.avif";
import doctorImage from "../Modal/ModalImage/doctors.jpg";

function Modal({ isModalOpen, closeModal, formType }) {
  const [role, setRole] = useState(""); // To manage the selected role (Parent or Doctor)

  useEffect(() => {
    // Reset the role state when the modal opens or closes
    if (!isModalOpen) {
      setRole(""); // Reset role state when modal is closed
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null; // If the modal is not open, don't render anything

  // Handle the role selection and show the appropriate form type (Login/Register)
  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Set the selected role (Parent or Doctor)
  };

  // Function to handle going back to the role selection
  const handleBack = () => {
    setRole(""); // Reset the role to go back to the role selection screen
  };

  // Render the correct form based on the selected role and formType
  const renderForm = () => {
    if (role === "Parent" && formType === "Login") {
      return <ParentLogin closeModal={closeModal} />;
    } else if (role === "Parent" && formType === "Register") {
      return <ParentRegister closeModal={closeModal} />;
    } else if (role === "Doctor" && formType === "Login") {
      return <DoctorLogin closeModal={closeModal} />;
    } else if (role === "Doctor" && formType === "Register") {
      return <DoctorRegister closeModal={closeModal} />;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Close Button */}
        <button className="modal-button close-modal" onClick={closeModal}>
          ×
        </button>

        {/* Back Button */}
        {role && (
          <button className="modal-button back-button" onClick={handleBack}>
            🡄
          </button>
        )}

        {!role && (
          <>
            <h2>Are you a Parent or Doctor?</h2>
            <div className="role-images">
              <div className="role-option" onClick={() => handleRoleSelection("Parent")}>
                <img src={parentImage} alt="Parent" />
                <p>Parent</p>
              </div>
              <div className="role-option" onClick={() => handleRoleSelection("Doctor")}>
                <img src={doctorImage} alt="Doctor" />
                <p>Doctor</p>
              </div>
            </div>
          </>
        )}

        {/* Render the appropriate form for login or register */}
        {role && renderForm()}
      </div>
    </div>
  );
}

export default Modal;
