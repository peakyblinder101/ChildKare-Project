import { useState, useEffect } from "react";
import "./DoctorProfile.css";

function DoctorProfile() {
  const [doctorData, setDoctorData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch doctor profile from the API
  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch("https://8fdsdscs-5000.asse.devtunnels.ms/api/getDoctorById", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch doctor profile");
      }

      const data = await response.json();
      setDoctorData(data); // Set the fetched doctor data
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  useEffect(() => {
    fetchDoctorProfile(); // Fetch doctor profile on component mount
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!doctorData) {
    return <div className="doctor-profile">Loading doctor profile...</div>;
  }

  return (
    <div className="doctor-profile">
      <h2 className="profile-title">Doctor Profile</h2>

      {/* Profile Image Section */}
      <div className="profile-image-container">
        <label htmlFor="profile-image-upload" className="profile-image-label">
          <img
            src={
              profileImage ||
              "https://thumbs.dreamstime.com/b/profile-anonymous-face-icon-gray-silhouette-person-male-businessman-profile-default-avatar-photo-placeholder-isolated-white-107003824.jpg"
            }
            alt="Profile"
            className="doc-profile-circle-image"
          />
        </label>
        <input
          type="file"
          id="profile-image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Profile Table Grid */}
      <div className="profile-grid-table">
        {/* First Column */}
        <div className="half-table">
          <table className="profile-table">
            <tbody>
              <tr>
                <th>First Name</th>
                <td>{doctorData.first_name}</td>
              </tr>
              <tr>
                <th>Last Name</th>
                <td>{doctorData.last_name}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{doctorData.gender || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Second Column */}
        <div className="half-table">
          <table className="profile-table">
            <tbody>
              <tr>
                <th>Specialization</th>
                <td>{doctorData.specialization}</td>
              </tr>
              <tr>
                <th>License Number</th>
                <td>{doctorData.license_number}</td>
              </tr>
              <tr>
                <th>Contact Number</th>
                <td>{doctorData.contact_number}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Width: Clinic Address and Email */}
      <div className="full-width-table">
        <table className="profile-table">
          <tbody>
            <tr>
              <th>Clinic Address</th>
              <td>{doctorData.clinic_address}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{doctorData.email || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorProfile;
