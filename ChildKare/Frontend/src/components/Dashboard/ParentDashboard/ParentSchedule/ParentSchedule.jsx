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

  const [babyDetails, setBabyDetails] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
const [isAppointmentDetailModalOpen, setIsAppointmentDetailModalOpen] = useState(false);


  useEffect(() => {
    const savedChild = localStorage.getItem("selectedChild");
    if (savedChild) {
      setBabyDetails(JSON.parse(savedChild));
    }
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://8fdsdscs-5000.asse.devtunnels.ms/api/getAllDoctors');
        const transformedDoctors = response.data.map((doc) => ({
          doctor_id: doc.doctor_id,
          name: `Dr. ${doc.first_name} ${doc.last_name}`,
          specialization: doc.specialization,
          imageUrl: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg',
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

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsAppointmentDetailModalOpen(false); // Ensure the details modal is closed
    setIsAppointmentModalOpen(true); // Open the doctor appointment modal
    setIsAppointmentFormStep(false); // Reset to the first step of the form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleMakeAppointment = async () => {
    if (!babyDetails || !babyDetails.id) {
      alert('Please select a child before making an appointment.');
      return;
    }
  
    try {
      const combinedDateTime = new Date(`${newAppointment.date}T${newAppointment.time}`);
  
      const appointmentData = {
        child_id: babyDetails.id,
        doctor_id: selectedDoctor?.doctor_id || 1,
        appointment_date: combinedDateTime.toISOString(),
        reason: newAppointment.reason,
        status: "pending",
      };
  
      const token = localStorage.getItem('token');
  
      await axios.post('https://8fdsdscs-5000.asse.devtunnels.ms/api/createAppointment', appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setAppointments([...appointments, appointmentData]); // Add the new appointment to the list
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
    if (!appointments || appointments.length === 0) {
      console.warn('No appointments available.');
      return;
    }
  
    const clickedDate = value.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const foundAppointment = appointments.find((app) =>
      new Date(app.appointment_date).toISOString().split('T')[0] === clickedDate
    );
  
    setDate(value); // Highlight the selected date
  
    if (foundAppointment) {
      setSelectedAppointment(foundAppointment);
      setIsAppointmentModalOpen(false); // Ensure the doctor modal is closed
      setIsAppointmentDetailModalOpen(true); // Open the appointment details modal
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const calendarDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        .toISOString()
        .split('T')[0];
  
      const hasAppointment = appointments.some((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date).toISOString().split('T')[0];
        return appointmentDate === calendarDate;
      });
  
      if (hasAppointment) {
        return 'has-appointment'; // Add a custom class for dates with appointments
      }
    }
    return ''; // Default return value
  };

  // const formatTime = (time24) => {
  //   if (!time24) return '';
  //   const [hour, minute] = time24.split(':');
  //   const date = new Date();
  //   date.setHours(+hour);
  //   date.setMinutes(+minute);
  //   return date.toLocaleTimeString('en-US', {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     hour12: true
  //   });
  // };

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
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Find the doctor by doctor_id to get the name
    const matchedDoctor = doctorList.find(doc => doc.doctor_id === appointment.doctor_id);
    const doctorName = matchedDoctor ? matchedDoctor.name : `Doctor ID: ${appointment.doctor_id}`;

    return (
      <div key={index} className="par-appointment-row">
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
      

      {isAppointmentModalOpen && (
        <div className="appointment-modal">
          <div className="parent-modal-content">
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
                    />
                  </div>

                  <div className="form-actions">
                  <button type="button" onClick={handleMakeAppointment}>Book Appointment</button>

                  </div>
                </form>
              </div>
            )}
            {isAppointmentDetailModalOpen && selectedAppointment && (
            <div className="appointment-modal">
              <div className="parent-modal-content">
                <span className="par-close-modal" onClick={() => setIsAppointmentDetailModalOpen(false)}>×</span>

                <h2>Appointment Details</h2>
                <p><strong>Date:</strong> {new Date(selectedAppointment.appointment_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(selectedAppointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
                <p><strong>Status:</strong> <span className={`status-tag ${selectedAppointment.status}`}>{selectedAppointment.status}</span></p>

                {(() => {
  if (!doctorList || doctorList.length === 0) {
    return <p>Doctor information is not available.</p>;
  }

  const matchedDoc = doctorList.find(doc => doc.doctor_id === selectedAppointment.doctor_id);
  if (matchedDoc) {
    return (
      <>
        <p><strong>Doctor:</strong> {matchedDoc.name}</p>
        <p><strong>Specialization:</strong> {matchedDoc.specialization}</p>
        <p><strong>Clinic Address:</strong> {matchedDoc.address}</p>
        <p><strong>Contact:</strong> {matchedDoc.contact}</p>
      </>
    );
  }
  return <p><strong>Doctor ID:</strong> {selectedAppointment.doctor_id}</p>;
})()}
              </div>
            </div>
          )}

          </div>
        </div>
      )}
    </div>
  );
}

export default ParentSchedule;
