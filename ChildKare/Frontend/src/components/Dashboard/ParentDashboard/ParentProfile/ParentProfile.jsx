import React, { useState } from 'react';
import './ParentProfile.css';

function ParentProfile() {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddBabyModal, setShowAddBabyModal] = useState(false);

  // Baby form states
  const [babyId, setBabyId] = useState('');
  const [babyFirstName, setBabyFirstName] = useState('');
  const [babyLastName, setBabyLastName] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyMonths, setBabyMonths] = useState('');
  const [babyGender, setBabyGender] = useState('');

  const [imageUrl, setImageUrl] = useState(
    'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg?t=st=1744045266~exp=1744048866~hmac=e2967ab7d452a9a45b4ce3ff6270c3c8e8d720c26923a41fd9f5a9dbde2c65d2&w=740'
  );

  const handleOpenModal = (baby) => {
    setSelectedBaby(baby);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBaby(null);
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const parentData = {
    firstName: 'John',
    middleName: 'Paul',
    lastName: 'Doe',
    age: '35',
    contactNumber: '+1 234 567 890',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    babies: [
      {
        idNo: 'B001',
        firstName: 'Baby One',
        lastName: 'Doe',
        weight: '3.5 kg',
        age: '6 months',
        gender: 'Male',
      },
      {
        idNo: 'B002',
        firstName: 'Baby Two',
        lastName: 'Doe',
        weight: '4.2 kg',
        age: '8 months',
        gender: 'Female',
      },
    ],
  };

  return (
    <div className="par-pro-parent-profile-wrapper">
      <h2>Parent Profile</h2>

      {/* Profile Image with Upload */}
      <div className="par-pro-profile-image-container">
        <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
          <img src={imageUrl} alt="Profile" className="par-pro-profile-img" />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

      {/* Parent Details */}
      <div className="par-pro-profile-details-section">
        <h3>Mother's Information</h3>
        <div className="par-pro-details-grid">
          <div className="par-pro-left-column">
            <table className="par-pro-profile-table">
              <tbody>
                <tr><th>First Name</th><td>{parentData.firstName}</td></tr>
                <tr><th>Middle Name</th><td>{parentData.middleName}</td></tr>
                <tr><th>Last Name</th><td>{parentData.lastName}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="par-pro-right-column">
            <table className="par-pro-profile-table">
              <tbody>
                <tr><th>Age</th><td>{parentData.age}</td></tr>
                <tr><th>Contact Number</th><td>{parentData.contactNumber}</td></tr>
                <tr><th>Email</th><td>{parentData.email}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="par-pro-location-section">
          <table className="par-pro-profile-table">
            <tbody>
              <tr>
                <th>Location</th>
                <td>{parentData.location}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Baby Info Buttons */}
      <div className="par-pro-baby-info-wrapper">
        <div className="par-pro-baby-header">
          <h3>Baby's Information</h3>
          <button className="par-pro-add-baby-button" onClick={() => setShowAddBabyModal(true)}>
            + Add Baby
          </button>
        </div>
        <div className="par-pro-baby-cards">
          {parentData.babies.map((baby, index) => (
            <button
              key={index}
              className="par-pro-baby-card-button"
              onClick={() => handleOpenModal(baby)}
            >
              View Baby {index + 1}
            </button>
          ))}
        </div>
      </div>


      {/* Modal */}
      {showModal && (
        <div className="par-pro-modal-overlay">
          <div className="par-pro-modal-content">
            <button className="par-pro-close-button" onClick={handleCloseModal}>×</button>
            {selectedBaby && (
              <div className="par-pro-modal-grid">
                <div className="par-pro-modal-left">
                  <table className="par-pro-profile-table">
                    <tbody>
                      <tr><th>ID No</th><td>{selectedBaby.idNo}</td></tr>
                      <tr><th>First Name</th><td>{selectedBaby.firstName}</td></tr>
                      <tr><th>Last Name</th><td>{selectedBaby.lastName}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="par-pro-modal-right">
                  <table className="par-pro-profile-table">
                    <tbody>
                      <tr><th>Weight</th><td>{selectedBaby.weight}</td></tr>
                      <tr><th>Age</th><td>{selectedBaby.age}</td></tr>
                      <tr><th>Gender</th><td>{selectedBaby.gender}</td></tr>
                    </tbody>
                  </table>

                  <div className="par-pro-modal-button-wrapper">
                    <button className="par-pro-modal-action-button">Switch</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

        {showAddBabyModal && (
          <div className="par-pro-modal-overlay">
            <div className="par-pro-modal-content">
              <button className="par-pro-close-button" onClick={() => setShowAddBabyModal(false)}>×</button>
              <form className="user_details" onSubmit={(e) => {
                e.preventDefault();
                // For now just log it
                console.log({
                  babyId, babyFirstName, babyLastName, babyWeight, babyMonths, babyGender
                });
                setShowAddBabyModal(false); // Close modal
              }}>
                {/* Your fields go here */}
                <div className="input_box">
                  <div className="box-reg">
                    <input type="text" placeholder=" " value={babyId} onChange={(e) => setBabyId(e.target.value)} required />
                    <span>Baby ID</span>
                  </div>
                </div>

                <div className="input_box">
                  <div className="box-reg">
                    <input type="text" placeholder=" " value={babyFirstName} onChange={(e) => setBabyFirstName(e.target.value)} required />
                    <span>Baby First Name</span>
                  </div>
                </div>

                <div className="input_box">
                  <div className="box-reg">
                    <input type="text" placeholder=" " value={babyLastName} onChange={(e) => setBabyLastName(e.target.value)} required />
                    <span>Baby Last Name</span>
                  </div>
                </div>

                <div className="input_box">
                  <div className="box-reg">
                    <input type="text" placeholder=" " value={babyWeight} onChange={(e) => setBabyWeight(e.target.value)} required />
                    <span>Weight</span>
                  </div>
                </div>

                <div className="input_box">
                  <div className="box-reg">
                    <input type="number" placeholder=" " value={babyMonths} onChange={(e) => setBabyMonths(e.target.value)} required />
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

                <div className="modal-btn-add-baby">
                  <button type="submit">Add Baby</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
}
export default ParentProfile;
