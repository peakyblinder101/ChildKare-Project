import { useState, useEffect } from 'react';
import './ParentProfile.css';
import {uploadImageToCloudinary} from "../../../../utils/imageUploader";

function ParentProfile() {
  const [showAddBabyModal, setShowAddBabyModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg'
  );
  const [profileImage, setProfileImage] = useState(null);

  // Baby form states
  const [babyId, setBabyId] = useState('');
  const [babyFirstName, setBabyFirstName] = useState('');
  const [babyLastName, setBabyLastName] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyBirthdate, setBabyBirthdate] = useState('');
  const [babyGender, setBabyGender] = useState('');

  const token = localStorage.getItem('token');
  const [parentData, setParentData] = useState(null);
  const [conversations, setConversations] = useState([]);

  const fetchParentProfile = async () => {
    try {
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/parentProfile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();

      const babiesResponse = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/children', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }); 

      const babies = await babiesResponse.json();

      setParentData({
        firstName: data.first_name,
        middleName: data.middle_name || '',
        lastName: data.last_name,
        age: data.age || 'N/A',
        contactNumber: data.contact_number,
        email: data.email || 'N/A',
        location: data.location,
        profilePicture: data.profilePicture || imageUrl,
        babies: babies || [],
      });

      // Fetch conversation history (assuming there's an endpoint for this)
      const chatHistoryResponse = await fetch(`https://8fdsdscs-5000.asse.devtunnels.ms/api/parentProfile/${data.id}/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!chatHistoryResponse.ok) throw new Error('Failed to fetch chat history');
      const chatHistory = await chatHistoryResponse.json();
      setConversations(chatHistory);

    } catch (error) {
      console.error('Error fetching parent profile or babies or conversations:', error);
    }
  };

  useEffect(() => {
    fetchParentProfile();
  }, []);

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    const imageUrl = await uploadImageToCloudinary(file);

    const token = localStorage.getItem('token'); // get token
      const response = await fetch(
        `https://8fdsdscs-5000.asse.devtunnels.ms/api/updateParent`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add auth if needed
          },
          body: JSON.stringify({ profilePicture: imageUrl }), // Send the image URL in the request body
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
      setParentData(prev => ({
        ...prev,
        profilePicture: imageUrl,
      }));
  
    if (imageUrl) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!parentData) {
    return <div className="doctor-profile">Loading doctor profile...</div>;
  }

  const handleAddBabySubmit = async (e) => {
    e.preventDefault();

    const newBaby = {
      id_no: babyId,
      first_name: babyFirstName,
      last_name: babyLastName,
      weight: babyWeight,
      birthdate: babyBirthdate,
      gender: babyGender,
    };

    try {
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/addBaby', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBaby),
      });

      if (!response.ok) throw new Error('Failed to add baby');

      // Reset form
      setBabyId('');
      setBabyFirstName('');
      setBabyLastName('');
      setBabyWeight('');
      setBabyBirthdate('');
      setBabyGender('');
      setShowAddBabyModal(false);
      fetchParentProfile();
    } catch (error) {
      console.error('Error adding baby:', error);
    }
  };

  const calculateBabyAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const ageInMilliseconds = new Date() - birthDate;
    const ageInMonths = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 30));
    return ageInMonths;
  };

  const renderConversations = () => {
    return conversations.map((chat, index) => {
      return (
        <div key={index}>
          <h4>{chat.first_name} {chat.last_name}</h4>
          <p>Contact: {chat.contact_number}</p>
          <p>Location: {chat.location}</p>
        </div>
      );
    });
  };

  return (
    <div className="par-pro-parent-profile-wrapper">
      <h2>Parent Profile</h2>

      {parentData ? (
        <>
          <div className="par-pro-profile-image-container">
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
              <img src={parentData.profilePicture} alt="Profile" className="par-pro-profile-img" />
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </div>

          <div className="par-pro-profile-details-section">
            <h3>Mothers Information</h3>
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
                  <tr><th>Location</th><td>{parentData.location}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Baby Cards */}
          <div className="par-pro-baby-info-wrapper">
            <div className="par-pro-baby-header">
              <h3>Babys Information</h3>
              <button className="par-pro-add-baby-button" onClick={() => setShowAddBabyModal(true)}>
                + Add Baby
              </button>
            </div>
            <div className="par-pro-baby-cards">
              {parentData.babies.map((baby, index) => {
                const selectedBaby = JSON.parse(localStorage.getItem("selectedChild") || "{}");
                const isSelected = baby.id === selectedBaby.id;

                return (
                  <div
                    key={index}
                    className={`par-pro-baby-card ${isSelected ? "active-baby-card" : ""}`}
                  >
                    <h4>Baby {index + 1}: {baby.first_name} {baby.last_name}</h4>
                    <table className="par-pro-profile-table">
                      <tbody>
                        <tr><th>ID No</th><td>{baby.id}</td></tr>
                        <tr><th>First Name</th><td>{baby.first_name}</td></tr>
                        <tr><th>Last Name</th><td>{baby.last_name}</td></tr>
                        <tr><th>Weight</th><td>{baby.weight}</td></tr>
                        <tr><th>Age (Months)</th><td>{calculateBabyAge(baby.birthdate)}</td></tr>
                        <tr><th>Gender</th><td>{baby.gender}</td></tr>
                      </tbody>
                    </table>
                    <div className="par-pro-modal-button-wrapper">
                      <button
                        className="par-pro-modal-action-button"
                        onClick={() => {
                          const newSelected = {
                            id: baby.id,
                            first_name: baby.first_name,
                            last_name: baby.last_name,
                            gender: baby.gender,
                            weight: baby.weight,
                            age: calculateBabyAge(baby.birthdate),
                          };
                          localStorage.setItem("selectedChild", JSON.stringify(newSelected));
                          window.location.reload();
                        }}
                        disabled={isSelected}
                      >
                        {isSelected ? "Selected" : "Switch"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversations */}
          <div className="par-pro-conversations">
            <h3>Conversations</h3>
            {renderConversations()}
          </div>
        </>
      ) : (
        <p>Loading parent profile...</p>
      )}

      {/* Add Baby Modal */}
      {showAddBabyModal && (
        <div className="par-pro-modal-overlay">
          <div className="par-pro-modal-content">
            <button className="par-pro-close-button" onClick={() => setShowAddBabyModal(false)}>×</button>
            <form className="user_details" onSubmit={handleAddBabySubmit}>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyId} onChange={(e) => setBabyId(e.target.value)} required /><span>Baby ID</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyFirstName} onChange={(e) => setBabyFirstName(e.target.value)} required /><span>First Name</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyLastName} onChange={(e) => setBabyLastName(e.target.value)} required /><span>Last Name</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyWeight} onChange={(e) => setBabyWeight(e.target.value)} required /><span>Weight</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="date" placeholder=" " value={babyBirthdate} onChange={(e) => setBabyBirthdate(e.target.value)} required /><span>Birthdate</span></div></div>
              <div className="input_box"><div className="box-reg"><select value={babyGender} onChange={(e) => setBabyGender(e.target.value)} required><option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option></select></div></div>
              <div className="modal-buttons-wrapper">
                <button className="par-pro-modal-action-button" type="submit">Add Baby</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentProfile;
