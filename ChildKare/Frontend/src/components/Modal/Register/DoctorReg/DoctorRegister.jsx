import React, { useState } from "react";
import "../RegisterStyle/RegisterStyle.css";
import { useNavigate } from "react-router-dom"; 

function DoctorRegister({ closeModal }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Doctor registering with", {
      firstName,
      lastName,
      password,
      gender,
      specialization,
      licenseNumber,
      contactNumber,
      clinicAddress,
    });

    navigate("/doctor-dashboard");

    // closeModal();
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
