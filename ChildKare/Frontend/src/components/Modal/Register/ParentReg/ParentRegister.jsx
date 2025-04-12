// src/components/Parent/ParentRegister.jsx
import React, { useState } from "react";
import "../RegisterStyle/RegisterStyle.css";

function ParentRegister({ closeModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [babyFirstName, setBabyFirstName] = useState("");
  const [babyLastName, setBabyLastName] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [babyGender, setBabyGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parent registering with", {
      firstName,
      lastName,
      middleName,
      age,
      babyFirstName,
      babyLastName,
      babyWeight,
      babyGender,
    });
    closeModal();
  };

  return (
    <div className="register-container">
      <div className="register-container-title">
        <p>Parent Registration</p>
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
          <span>Mothers First Name</span>
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
          <span>Mothers Last Name</span>
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
          <span>Mothers Middle Name</span>
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
            type="number"
            placeholder=""
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <span>Mothers Age</span>
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

        </div>
      </form>

      <div className="reg_btn">
          <input type="submit" value="Register" />
      </div>
    
    </div>
  );
}

export default ParentRegister;
