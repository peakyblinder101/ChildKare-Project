import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './DoctorHome.css';

function DoctorHome() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    { time: '9:00 AM', date: '2025-04-18', status: 'pending', parentName: 'John Doe', idNo: '12345', reason: 'Routine Checkup' },
    { time: '10:30 AM', date: '2025-04-19', status: 'accepted', parentName: 'Jane Smith', idNo: '23456', reason: 'Vaccination' },
    { time: '1:00 PM', date: '2025-04-20', status: 'pending', parentName: 'Alice Green', idNo: '34567', reason: 'General Checkup' },
    { time: '2:00 PM', date: '2025-04-21', status: 'accepted', parentName: 'Bob Brown', idNo: '45678', reason: 'Routine Checkup' },
    { time: '3:30 PM', date: '2025-04-22', status: 'pending', parentName: 'Charlie Blue', idNo: '56789', reason: 'Consultation' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  const acceptAppointment = (appointment) => {
    const updatedAppointments = appointments.map((app) =>
      app.idNo === appointment.idNo ? { ...app, status: 'accepted' } : app
    );
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const cancelAppointment = (appointment) => {
    const updatedAppointments = appointments.filter((app) => app.idNo !== appointment.idNo);
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const markAsDone = (appointment) => {
    const updatedAppointments = appointments.filter((app) => app.idNo !== appointment.idNo);
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const tileClassName = ({ date, view }) => {
    const dateStr = date.toLocaleDateString('en-CA');
  
    if (view === 'month') {
      const hasAcceptedAppointment = appointments.some(
        (app) => app.date === dateStr && app.status === 'accepted'
      );
  
      return hasAcceptedAppointment ? 'accepted-date' : '';
    }
  
    return '';
  };
  
  const handleCalendarDayClick = (date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    const acceptedApp = appointments.filter((app) => app.date === dateStr && app.status === 'accepted');
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
              <h3 className="group-title">Accepted</h3>
              <ul>
                {appointments
                  .filter((app) => app.status === 'accepted')
                  .map((appointment, index) => (
                    <li
                      key={`accepted-${index}`}
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
                  Accept
                </button>
                <button className="cancel-btn" onClick={() => cancelAppointment(selectedAppointment)}>
                  Reject
                </button>
              </div>
            )}

            {selectedAppointment.status === 'accepted' && (
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
