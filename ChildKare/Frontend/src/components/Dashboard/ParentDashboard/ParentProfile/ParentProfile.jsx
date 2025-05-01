import { useState, useEffect } from 'react';
import './ParentProfile.css';

function ParentProfile() {
  const [showAddBabyModal, setShowAddBabyModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg'
  );

  // Baby form states
  const [babyId, setBabyId] = useState('');
  const [babyFirstName, setBabyFirstName] = useState('');
  const [babyLastName, setBabyLastName] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyMonths, setBabyMonths] = useState('');
  const [babyGender, setBabyGender] = useState('');

  const token = localStorage.getItem('token');
  const [parentData, setParentData] = useState(null);

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
        babies: babies || [],
      });
    } catch (error) {
      console.error('Error fetching parent profile or babies:', error);
    }
  };

  useEffect(() => {
    fetchParentProfile();
  }, []);

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

  const handleAddBabySubmit = async (e) => {
    e.preventDefault();

    const newBaby = {
      id_no: babyId,
      first_name: babyFirstName,
      last_name: babyLastName,
      weight: babyWeight,
      months: babyMonths,
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
      setBabyMonths('');
      setBabyGender('');
      setShowAddBabyModal(false);
      fetchParentProfile();
    } catch (error) {
      console.error('Error adding baby:', error);
    }
  };

  return (
    <div className="par-pro-parent-profile-wrapper">
      <h2>Parent Profile</h2>

      {parentData ? (
        <>
          <div className="par-pro-profile-image-container">
            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
              <img src={imageUrl} alt="Profile" className="par-pro-profile-img" />
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

          {/* Baby Cards ADDED NEW CODE */}
          <div className="par-pro-baby-info-wrapper">
            <div className="par-pro-baby-header">
              <h3>Baby's Information</h3>
              <button className="par-pro-add-baby-button" onClick={() => setShowAddBabyModal(true)}>
                + Add Baby
              </button>
            </div>
            <div className="par-pro-baby-cards">
              {parentData.babies.map((baby, index) => {
                const selectedBaby = JSON.parse(localStorage.getItem("selectedChild") || "{}");
                const isSelected = baby.idNo === selectedBaby.id;

                return (
                  <div
                    key={index}
                    className={`par-pro-baby-card ${isSelected ? "active-baby-card" : ""}`}
                  >
                    <h4>Baby {index + 1}: {baby.firstName} {baby.lastName}</h4>
                    <table className="par-pro-profile-table">
                      <tbody>
                        <tr><th>ID No</th><td>{baby.idNo}</td></tr>
                        <tr><th>First Name</th><td>{baby.firstName}</td></tr>
                        <tr><th>Last Name</th><td>{baby.lastName}</td></tr>
                        <tr><th>Weight</th><td>{baby.weight}</td></tr>
                        <tr><th>Age</th><td>{baby.age}</td></tr>
                        <tr><th>Gender</th><td>{baby.gender}</td></tr>
                      </tbody>
                    </table>
                    <div className="par-pro-modal-button-wrapper">
                      <button
                        className="par-pro-modal-action-button"
                        onClick={() => {
                          const newSelected = {
                            id: baby.idNo,
                            first_name: baby.firstName,
                            last_name: baby.lastName,
                            gender: baby.gender,
                            weight: baby.weight,
                            age: baby.age,
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
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyFirstName} onChange={(e) => setBabyFirstName(e.target.value)} required /><span>Baby First Name</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyLastName} onChange={(e) => setBabyLastName(e.target.value)} required /><span>Baby Last Name</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="text" placeholder=" " value={babyWeight} onChange={(e) => setBabyWeight(e.target.value)} required /><span>Weight</span></div></div>
              <div className="input_box"><div className="box-reg"><input type="number" placeholder=" " value={babyMonths} onChange={(e) => setBabyMonths(e.target.value)} required /><span>Age (in months)</span></div></div>
              <div className="input_box">
                <div className="box-reg">
                  <div className="gender-title">Gender</div>
                  <div className="gender-category">
                    <label><input type="radio" name="babyGender" value="Male" checked={babyGender === "Male"} onChange={(e) => setBabyGender(e.target.value)} required />Male</label>
                    <label><input type="radio" name="babyGender" value="Female" checked={babyGender === "Female"} onChange={(e) => setBabyGender(e.target.value)} required />Female</label>
                  </div>
                </div>
              </div>
              <div className="modal-btn-add-baby"><button type="submit">Add Baby</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentProfile;
