import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './DoctorHome.css';

function DoctorHome() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch appointments from the API
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch('https://8fdsdscs-5000.asse.devtunnels.ms/api/getAppointmentsByDoctorId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();

      // Transform the data to match the existing structure
      const transformedAppointments = data.map((appointment) => ({
        idNo: appointment.id,
        parentName: `Parent ID: ${appointment.parent_id}`, // Replace with actual parent name if available
        time: new Date(appointment.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date(appointment.appointment_date).toLocaleDateString('en-CA'), // Format as 'YYYY-MM-DD'
        reason: appointment.reason,
        status: appointment.status.toLowerCase(), // Ensure status is lowercase for consistency
      }));

      setAppointments(transformedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments(); // Fetch appointments on component mount
  }, []);

  const handleDateClick = (value) => {
    setDate(value);
  };

  const handlePendingClick = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const acceptAppointment = async (appointment) => {
    console.log(appointment);
    try {
      const token = localStorage.getItem('token'); // get token
      const response = await fetch(
        `https://8fdsdscs-5000.asse.devtunnels.ms/api/updateAppointment/${appointment.idNo}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add auth if needed
          },
          body: JSON.stringify({ status: 'approved' }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }
  
      // Update state after server confirms
      const updatedAppointments = appointments.map((app) =>
        app.idNo === appointment.idNo ? { ...app, status: 'approved' } : app
      );
      setAppointments(updatedAppointments);
      setModalVisible(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };
  

  const cancelAppointment = async (appointment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://8fdsdscs-5000.asse.devtunnels.ms/api/updateAppointment/${appointment.idNo}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: 'declined' }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to update appointment status to declined');
      }
  
      // Update status locally
      const updatedAppointments = appointments.map((app) =>
        app.idNo === appointment.idNo ? { ...app, status: 'declined' } : app
      );
      setAppointments(updatedAppointments);
      setModalVisible(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error declining appointment:', error);
    }
  };
    

  const markAsDone = (appointment) => {
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id ? { ...app, status: 'done' } : app
    );
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };
  

  const tileClassName = ({ date, view }) => {
    const dateStr = date.toLocaleDateString('en-CA'); // Format the date as 'YYYY-MM-DD'
  
    if (view === 'month') {
      const hasApprovedAppointment = appointments.some(
        (app) => app.date === dateStr && app.status === 'approved'
      );
  
      return hasApprovedAppointment ? 'approved-date' : '';
    }
  
    return '';
  };
  const handleCalendarDayClick = (date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    const acceptedApp = appointments.filter((app) => app.date === dateStr && app.status === 'approved');
    if (acceptedApp.length > 0) {
      setSelectedAppointment(acceptedApp[0]);
      setModalVisible(true);
    }
  };

  return (
    <div className="doctor-home-wrapper">
      <div className="doctor-home">
        <div className="doctor-content">
          {/* Calendar Section */}
          <div className="doctor-calendar">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateClick}
              value={date}
              tileClassName={tileClassName}
              calendarType="US"
              onClickDay={handleCalendarDayClick}
            />
          </div>

          {/* Appointments Section */}
          <div className="doctor-appointments-list">
            <h2>Appointments</h2>
            <div className="appointments-header">
              <span>Time</span>
              <span>Date</span>
              <span>Status</span>
            </div>

            {/* Pending Appointments */}
            <div className="appointments-scroll-container">
              <h3 className="group-title">Pending</h3>
              <ul>
                {appointments
                  .filter((app) => app.status === 'pending')
                  .map((appointment, index) => (
                    <li
                      key={`pending-${index}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePendingClick(appointment)}
                    >
                      <span className="time">{appointment.time}</span>
                      <span className="date">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                      <span className={`status ${appointment.status.toLowerCase()}`}>
                        ● {appointment.status}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Accepted Appointments */}
            <div className="appointments-scroll-container">
              <h3 className="group-title">Approved</h3>
              <ul>
                {appointments
                  .filter((app) => app.status === 'approved')
                  .map((appointment, index) => (
                    <li
                      key={`approved-${index}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setModalVisible(true);
                      }}
                    >
                      <span className="time">{appointment.time}</span>
                      <span className="date">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                      <span className={`status ${appointment.status.toLowerCase()}`}>
                        ● {appointment.status}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && selectedAppointment && (
        <div className="modal-doctor-app-sched">
          <div className="doctor-modal-content">
            <span className="doc-close-modal" onClick={closeModal}>
              ×
            </span>
            <h3>Appointment Details</h3>
            <table className="modal-table">
              <tbody>
                <tr>
                  <th>Parent Name</th>
                  <td>{selectedAppointment.parentName}</td>
                </tr>
                <tr>
                  <th>Baby ID No</th>
                  <td>{selectedAppointment.idNo}</td>
                </tr>
                <tr>
                  <th>Time</th>
                  <td>{selectedAppointment.time}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(selectedAppointment.date).toLocaleDateString('en-US')}</td>
                </tr>
                <tr>
                  <th>Reason</th>
                  <td>{selectedAppointment.reason}</td>
                </tr>
              </tbody>
            </table>

            {selectedAppointment.status === 'pending' && (
              <div className="modal-actions">
                <button className="accept-btn" onClick={() => acceptAppointment(selectedAppointment)}>
                  Approve
                </button>
                <button className="cancel-btn" onClick={() => cancelAppointment(selectedAppointment)}>
                  Reject
                </button>
              </div>
            )}

            {selectedAppointment.status === 'approved' && (
              <div className="modal-actions done-section">
                <button className="done-btn" onClick={() => markAsDone(selectedAppointment)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorHome;