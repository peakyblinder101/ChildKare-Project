import React, { useState } from "react";
import "../RegisterStyle/RegisterStyle.css";

function DoctorRegister({ closeModal }) {
  const [doctorId, setDoctorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor registering with", {
      doctorId,
      firstName,
      lastName,
      middleName,
      password,
      position,
      gender,
    });
    closeModal();
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
            placeholder=""
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
            placeholder=""
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
          <span>Doctor ID</span>
          </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
           <input
            type="text"
            placeholder=""
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
            placeholder=""
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
            placeholder=""
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            required
          />
          <span>Middle Name</span>
          </div>
          </div>

          <div className="input_box">
            <div className="box-reg">
           <input
            type="text"
            placeholder=""
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span>Confirm Password</span>
          </div> 
          </div> 

          <div className="input_box">
            <div className="box-reg">
           <input
            type="text"
            placeholder=""
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <span>Position</span>
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
