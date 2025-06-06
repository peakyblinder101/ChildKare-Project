import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ParentSchedule.css';
import axios from 'axios';

function ParentSchedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAppointmentFormStep, setIsAppointmentFormStep] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
const [isAppointmentDetailModalOpen, setIsAppointmentDetailModalOpen] = useState(false);


  // useEffect(() => {
  //   const savedChild = localStorage.getItem("selectedChild");
  //   if (savedChild) {
  //     setBabyDetails(JSON.parse(savedChild));
  //   }
  // }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://8fdsdscs-5000.asse.devtunnels.ms/api/getAllDoctors');
        const transformedDoctors = response.data.map((doc) => ({
          doctor_id: doc.id,
          name: `Dr. ${doc.first_name} ${doc.last_name}`,
          specialization: doc.specialization,
          imageUrl: doc.profilePicture,
          contact: doc.contact_number,
          license: doc.license_number,
          address: doc.clinic_address,
          description: `Specialist in ${doc.specialization}.`
        }));
        setDoctorList(transformedDoctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://8fdsdscs-5000.asse.devtunnels.ms/api/getAppointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
    fetchAppointments();
  }, []);
  const handleUpdateAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://8fdsdscs-5000.asse.devtunnels.ms/api/updateAppointment/${selectedAppointment.id}`,
        {
          appointment_date: selectedAppointment.appointment_date,
          reason: selectedAppointment.reason,
          status: selectedAppointment.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        // Update the local state with the updated appointment
        setAppointments((prevAppointments) =>
          prevAppointments.map((app) =>
            app.id === selectedAppointment.id ? { ...app, ...selectedAppointment } : app
          )
        );
        alert('Appointment successfully updated!');
        setIsEditing(false); // Exit editing mode
      } else {
        alert('Failed to update the appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('An error occurred while updating the appointment.');
    }
  };


  

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    console.log('Selected doctor:', doctor);
    console.log('Selected doctor:', doctor.doctor_id);
    setDoctorId(doctor.doctor_id); // Store the selected doctor's ID
    setIsAppointmentDetailModalOpen(false); // Ensure the details modal is closed
    setIsAppointmentModalOpen(true); // Open the doctor appointment modal
    setIsAppointmentFormStep(false); // Reset to the first step of the form
  };

  const handleDeleteAppointment = async (appointment) => {
    try {
      console.log('Deleting appointment:', appointment.id);
      console.log('Deleting appointment:', selectedAppointment.reason);
      console.log('Deleting appointment:', selectedAppointment);
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `https://8fdsdscs-5000.asse.devtunnels.ms/api/deleteAppointment/${appointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Delete response:', response);
      if (response.status === 200) {
        // Remove the deleted appointment from the local state
        setAppointments(appointments.filter((app) => app.id !== appointment.id));
        alert('Appointment successfully deleted!');
        setIsAppointmentDetailModalOpen(false);
        setSelectedAppointment(null);
      } 
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('An error occurred while deleting the appointment.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };
  

  const handleMakeAppointment = async () => {

    try {
      // Construct date-time string as-is without converting to UTC
      const localDateTime = `${newAppointment.date}T${newAppointment.time}`;
  
      const appointmentData = {
        doctor_id: doctorId,
        appointment_date: localDateTime, // No toISOString() here
        reason: newAppointment.reason,
        status: "pending",
      };
  
      const token = localStorage.getItem('token');
  
      await axios.post(
        'https://8fdsdscs-5000.asse.devtunnels.ms/api/createAppointment',
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Update local appointments list
      setAppointments([...appointments, appointmentData]);
      setIsAppointmentModalOpen(false);
      setSelectedDoctor(null);
      setNewAppointment({ date: '', time: '', reason: '' });
      alert('Appointment successfully created!');
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };
  

  const handleCloseModal = () => {
    setIsAppointmentModalOpen(false);
    setIsAppointmentDetailModalOpen(false); // Close the details modal as well
    setSelectedDoctor(null);
    setIsAppointmentFormStep(false);
  };

  const handleProceedToAppointmentForm = () => {
    setIsAppointmentFormStep(true);
  };

  const handleDateClick = (value) => {

  
    const clickedDate = value.toLocaleDateString('en-CA'); // Use local time
    console.log('Clicked Date:', clickedDate);
    const foundAppointment = appointments.find((app) => {
      const appointmentDate = new Date(app.appointment_date).toLocaleDateString('en-CA');
      console.log('Appointment Date:', appointmentDate);
      return appointmentDate;
    });
  
    setDate(value); // Highlight the selected date
    console.log(appointments);
    
    if (foundAppointment) {
      setSelectedAppointment(foundAppointment);
      console.log('Found Appointment:', foundAppointment);  
      console.log('Selected Appointment ID:', foundAppointment.id);
      setIsAppointmentModalOpen(false); // Ensure the doctor modal is closed
      setIsAppointmentDetailModalOpen(true); // Open the appointment details modal
    }
  };
  

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const calendarDate = date.toLocaleDateString('en-CA'); // Use local time zone
  
      const hasAppointment = appointments.some((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date).toLocaleDateString('en-CA'); // Use local time zone
        return appointmentDate === calendarDate;
      });
  
      if (hasAppointment) {
        return 'has-appointment'; // Add a custom class for dates with appointments
      }
    }
    return ''; // Default return value
  };
  const [isEditing, setIsEditing] = useState(false);


  return (
    <div className="parent-schedule">
      <h1>Appointment Schedule</h1>
      <div className="schedule-wrapper">
        <div className="schedule-container">

          <div className="doctors-list">
            <h2>Doctors</h2>
            <input
              type="text"
              className="doctor-search"
              placeholder="Search doctor by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="doctor-items">
              {doctorList
                .filter((doctor) =>
                  doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((doctor, index) => (
                  <li key={index} className="doctor-card" onClick={() => handleDoctorClick(doctor)}>
                    <img src={doctor.imageUrl} alt={doctor.name} className="doctor-avatar" />
                    <div className="doctor-info">
                      <div className="doctor-name">{doctor.name}</div>
                      <div className="doctor-specialization">{doctor.specialization}</div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="parent-calendar calendar">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateClick}
              value={date}
              tileClassName={tileClassName}
              calendarType="US"
            />
          </div>

          <div className="par-appointments-list">
            <h2>Appointments</h2>
            <div className="par-appointments-header">
              <div className="par-appointment-time">Time</div>
              <div className="par-appointment-date">Date</div>
              <div className="par-appointment-doctor">Doctor</div>
            </div>
            <div className="par-appointments-body">
            {appointments.map((appointment, index) => {
              const dateObj = new Date(appointment.appointment_date);

              const formattedDate = dateObj.toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });

              const formattedTime = dateObj.toLocaleTimeString('en-PH', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              });


                // Find the doctor by doctor_id to get the name
                const matchedDoctor = doctorList.find(doc => doc.doctor_id === appointment.doctor_id);
                const doctorName = matchedDoctor ? matchedDoctor.name : `Doctor ID: ${appointment.doctor_id}`;

                return (
                    <div
                      key={index}
                      className="par-appointment-row"
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsAppointmentDetailModalOpen(true);
                        setIsAppointmentModalOpen(false);
                      }}
                      style={{ cursor: 'pointer' }} // optional: shows a pointer cursor
                    >
                  
                    <div className="par-appointment-doctor">{doctorName}</div>
                    <div className="par-appointment-details">
                      <div className="par-appointment-time">{formattedTime}</div>
                      <div className="par-appointment-date">{formattedDate}</div>
                      <div className="par-appointment-status">
                        <span className={`status-tag ${appointment.status}`}>{appointment.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      

      {/* Doctor Appointment Modal */}
{isAppointmentModalOpen && (
  <div className="appointment-modal book-appointment-modal">
  <div className="book-modal-content">
      <span className="par-close-modal" onClick={handleCloseModal}>×</span>

      {!isAppointmentFormStep && selectedDoctor && (
        <div className="doctor-info-modal">
          <img src={selectedDoctor.imageUrl} alt={selectedDoctor.name} className="doctor-avatar-modal" />
          <div className="doctor-details">
            <h2>{selectedDoctor.name}</h2>
            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            <p><strong>Contact:</strong> {selectedDoctor.contact}</p>
            <p><strong>License No.:</strong> {selectedDoctor.license}</p>
            <p><strong>Clinic Address:</strong> {selectedDoctor.address}</p>
            <p><strong>Description:</strong> {selectedDoctor.description}</p>
            <button onClick={handleProceedToAppointmentForm}>Make Appointment</button>
          </div>
        </div>
      )}

      {isAppointmentFormStep && selectedDoctor && (
        <div className="appointment-form-section">
          <h3>Make an Appointment with {selectedDoctor.name}</h3>
          <form className="appointment-form">
            <div className="form-group">
              <label htmlFor="appointment-date">Date</label>
              <input
                id="appointment-date"
                type="date"
                name="date"
                value={newAppointment.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="appointment-time">Time</label>
              <input
                id="appointment-time"
                type="time"
                name="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Checkup</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Briefly describe your reason for the visit"
                rows="4"
                value={newAppointment.reason}
                onChange={handleInputChange}
                required
                className="par-textarea"  // adjust the height of textarea(reason for checkup)
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleMakeAppointment}>Book Appointment</button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
)}

{/* Appointment Details Modal */}
{isAppointmentDetailModalOpen && selectedAppointment && (
  <div className="appointment-modal details-appointment-modal">
    <div className="details-modal-content">
      <span
        className="par-close-modal"
        onClick={() => {
          setIsAppointmentDetailModalOpen(false);
          setSelectedAppointment(selectedAppointment.id);
          console.log(selectedAppointment.id);
          setIsEditing(false); // Reset to "Update" state when closing the modal
        }}
      >
        ×
      </span>

      <div className="appointment-form-section">
        <h3>Appointment Details</h3>
        <form className="appointment-form">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={new Date(selectedAppointment.appointment_date).toLocaleDateString('en-CA')}
              readOnly={!isEditing}
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment, id: selectedAppointment.reason,
                appointment_date: e.target.value
              })}
            />
          </div>

          <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={new Date(selectedAppointment.appointment_date)
              .toISOString()
              .substring(11, 16)} // Extracts the time in HH:mm format
            readOnly={!isEditing}
            onChange={(e) =>
              setSelectedAppointment({
                ...selectedAppointment,
                appointment_date: `${selectedAppointment.appointment_date.substring(0, 10)}T${e.target.value}`,
              })
            }
          />
        </div>
          <div className="form-group">
            <label>Reason for Checkup</label>
            <textarea
              value={selectedAppointment.reason}
              readOnly={!isEditing}
              rows="3"
              className="par-textarea"
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment,
                reason: e.target.value
              })}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              className={`status-tag ${selectedAppointment.status}`}
              value={selectedAppointment.status}
              readOnly
            />
          </div>

          {(() => {
            const matchedDoc = doctorList.find(doc => doc.doctor_id === selectedAppointment.doctor_id);
            if (matchedDoc) {
              return (
                <>
                  <div className="form-group">
                    <label>Doctor</label>
                    <input type="text" value={matchedDoc.name} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Specialization</label>
                    <input type="text" value={matchedDoc.specialization} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Clinic Address</label>
                    <input type="text" value={matchedDoc.address} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" value={matchedDoc.contact} readOnly />
                  </div>
                </>
              );
            }
            return (
              <div className="form-group">
                <label>Doctor ID</label>
                <input type="text" value={selectedAppointment.doctor_id} readOnly />
              </div>
            );
          })()}

<div className="form-actions">
            {/* Conditionally render buttons if the status is not 'approved' */}
            {selectedAppointment.status !== 'approved' && (
              <>
                <button
                  type="button"
                  className="par-update-button"
                  onClick={() => {
                    if (isEditing) {
                      handleUpdateAppointment();
                    }
                    setIsEditing(!isEditing); // Toggle between edit and view modes
                  }}
                >
                  {isEditing ? 'Save' : 'Update'}
                </button>
                <button
                  type="button"
                  className="par-delete-button"
                  onClick={() => handleDeleteAppointment(selectedAppointment)}
                >
                  Delete
                </button>
              </>
            )}
          </div>

        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ParentSchedule;
