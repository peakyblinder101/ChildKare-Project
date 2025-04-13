import React, { useState } from "react";
import "../RegisterStyle/RegisterStyle.css";
import { useNavigate } from "react-router-dom";

function ParentRegister({ closeModal }) {
  const [step, setStep] = useState("parent"); // step: 'parent' | 'baby'
  const navigate = useNavigate();

  // Parent Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // Baby Details
  const [babyId, setBabyId] = useState("");
  const [babyFirstName, setBabyFirstName] = useState("");
  const [babyLastName, setBabyLastName] = useState("");
  const [babyWeight, setBabyWeight] = useState("");
  const [babyMonths, setBabyMonths] = useState("");
  const [babyGender, setBabyGender] = useState("");

  const handleParentSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    // Move to baby details step
    setStep("baby");
  };

  const handleBabySubmit = (e) => {
    e.preventDefault();

    const babyDetails = {
      id: babyId,
      firstname: babyFirstName,
      lastName: babyLastName,
      weight: babyWeight,
      age: babyMonths,
      gender: babyGender,
    };

    localStorage.setItem("selectedChild", JSON.stringify(babyDetails));
    closeModal(); // or navigate("/parent-dashboard");
    navigate("/parent-dashboard");
  };

  return (
    <div className="register-container">
      <div className="register-container-title">
        <p>{step === "parent" ? "Parent Registration" : "Baby Details"}</p>
      </div>

      <form onSubmit={step === "parent" ? handleParentSubmit : handleBabySubmit}>
        <div className="user_details">

          {step === "parent" ? (
            <>
              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <span>Mother's First Name</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  <span>Mother's Last Name</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
                  <span>Mother's Middle Name</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                  <span>Mother's Age</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <span>Password</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <span>Confirm Password</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={babyId} onChange={(e) => setBabyId(e.target.value)} required />
                  <span>Baby ID</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={babyFirstName} onChange={(e) => setBabyFirstName(e.target.value)} required />
                  <span>Baby First Name</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={babyLastName} onChange={(e) => setBabyLastName(e.target.value)} required />
                  <span>Baby Last Name</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="text" value={babyWeight} onChange={(e) => setBabyWeight(e.target.value)} required />
                  <span>Weight</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                  <input type="number" value={babyMonths} onChange={(e) => setBabyMonths(e.target.value)} required />
                  <span>Age (in months)</span>
                </div>
              </div>

              <div className="input_box">
                <div className="box-reg">
                <div className="input_box gender">
                  <div className="gender-title">Gender</div>
                  <div className="gender-category">
                    <label>
                      <input
                        type="radio"
                        name="babyGender"
                        value="Male"
                        checked={babyGender === "Male"}
                        onChange={(e) => setBabyGender(e.target.value)}
                        required
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="babyGender"
                        value="Female"
                        checked={babyGender === "Female"}
                        onChange={(e) => setBabyGender(e.target.value)}
                        required
                      />
                      Female
                    </label>
                  </div>
                </div>
                </div>
              </div>
              
            </>
          )}

        </div>

        <div className="reg_btn">
          <input type="submit" value={step === "parent" ? "Register" : "Submit Baby Info"} />
        </div>
      </form>
    </div>
  );
}

export default ParentRegister;
