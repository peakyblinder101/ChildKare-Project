import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './DoctorHome.css';

function DoctorHome() {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    { time: '9:00 AM', date: '2025-04-18', status: 'Pending', parentName: 'John Doe', idNo: '12345', reason: 'Routine Checkup' },
    { time: '10:30 AM', date: '2025-04-19', status: 'Accepted', parentName: 'Jane Smith', idNo: '23456', reason: 'Vaccination' },
    { time: '1:00 PM', date: '2025-04-20', status: 'Pending', parentName: 'Alice Green', idNo: '34567', reason: 'General Checkup' },
    { time: '2:00 PM', date: '2025-04-21', status: 'Accepted', parentName: 'Bob Brown', idNo: '45678', reason: 'Routine Checkup' },
    { time: '3:30 PM', date: '2025-04-22', status: 'Pending', parentName: 'Charlie Blue', idNo: '56789', reason: 'Consultation' },
    { time: '9:30 AM', date: '2025-04-23', status: 'Pending', parentName: 'Diana White', idNo: '67890', reason: 'Checkup' },
    { time: '11:00 AM', date: '2025-04-24', status: 'Accepted', parentName: 'Eva Black', idNo: '78901', reason: 'Vaccination' },
    { time: '12:00 PM', date: '2025-04-25', status: 'Pending', parentName: 'Frank Grey', idNo: '89012', reason: 'General Checkup' },
    { time: '4:00 PM', date: '2025-04-26', status: 'Accepted', parentName: 'Grace Pink', idNo: '90123', reason: 'Routine Checkup' },
    { time: '10:00 AM', date: '2025-04-27', status: 'Pending', parentName: 'Hannah Red', idNo: '01234', reason: 'Consultation' },
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
    const updatedAppointments = appointments.map(app =>
      app.idNo === appointment.idNo ? { ...app, status: 'Accepted' } : app
    );
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const cancelAppointment = (appointment) => {
    const updatedAppointments = appointments.filter(app => app.idNo !== appointment.idNo);
    setAppointments(updatedAppointments);
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    const dateStr = date.toLocaleDateString('en-CA');
    const hasAppointment = appointments.some(app => app.date === dateStr);
    const isAccepted = appointments.some(app => app.date === dateStr && app.status === 'Accepted');
    const isPast = date < new Date(today.setHours(0, 0, 0, 0));
    const isSunday = date.getDay() === 0;

    if (view === 'month') {
      return [
        hasAppointment ? 'has-appointment' : '',
        isAccepted ? 'accepted-date' : '',
        isPast ? 'past-date' : '',
        isSunday ? 'sunday-date' : ''
      ].join(' ');
    }

    return '';
  };

  const handleCalendarDayClick = (date) => {
    const dateStr = date.toLocaleDateString('en-CA');
    const acceptedApp = appointments.filter(app => app.date === dateStr && app.status === 'Accepted');
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
                  .filter(app => app.status === 'Pending') 
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
                          day: '2-digit'
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
                  .filter(app => app.status === 'Accepted')
                  .map((appointment, index) => (
                    <li key={`accepted-${index}`}>
                      <span className="time">{appointment.time}</span>
                      <span className="date">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          year: '2-digit',
                          month: '2-digit',
                          day: '2-digit'
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
            <span className="doc-close-modal" onClick={closeModal}>×</span>
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

              <div className="modal-actions">
                {selectedAppointment.status === 'Pending' && (
                  <>
                    <button className="accept-btn" onClick={() => acceptAppointment(selectedAppointment)}>
                      Accept
                    </button>
                    <button className="cancel-btn" onClick={() => cancelAppointment(selectedAppointment)}>
                      Cancel
                    </button>
                  </>
                )}
              </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorHome;
