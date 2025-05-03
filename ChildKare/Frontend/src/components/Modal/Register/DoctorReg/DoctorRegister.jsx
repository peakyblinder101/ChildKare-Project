import React, { useState } from "react";
import "../RegisterStyle/RegisterStyle.css";
import { useNavigate } from "react-router-dom"; 

function DoctorRegister({ closeModal }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const doctorInfo = {
      firstName,
      lastName,
      email,
      password,
      gender,
      specialization,
      licenseNumber,
      contactNumber,
      clinicAddress,
    };

    localStorage.setItem("doctorData", JSON.stringify(doctorInfo));

    navigate("/doctor-dashboard");
  };
  
  return (
    <div className="register-container">
      <div className="register-container-title">
        <p>Doctor Registration</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user_details">
          <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <span>First Name</span>
            </div>
          </div>

          <div className="input_box">
                <div className="box-reg">
                  <input 
                    type="email" 
                    placeholder=" " 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                  <span>Email</span>
                </div>
            </div>

            <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <span>Last Name</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span>Password</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
              <span>Specialization</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span>Confirm Password</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="number"
                placeholder=" "
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
              <span>License Number</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="number"
                placeholder=" "
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <span>Contact Number</span>
            </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
              <input
                type="text"
                placeholder=" "
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                required
              />
              <span>Clinic Address</span>
            </div>
          </div>

          <div className="input_box">
            <div className="gender">
              <span className="gender-title">Gender</span>
              <div className="gender-category">
                <label htmlFor="male">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="reg_btn">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default DoctorRegister;
