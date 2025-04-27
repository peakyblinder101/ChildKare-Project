import React, { useState } from 'react';
import './ParentProfile.css';

function ParentProfile() {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://thumbs.dreamstime.com/b/profile-anonymous-face-icon-gray-silhouette-person-male-businessman-profile-default-avatar-photo-placeholder-isolated-white-107003824.jpg'
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
        <h3>Baby's Information</h3>
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentProfile;
