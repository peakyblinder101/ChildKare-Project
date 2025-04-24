import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './DoctorHome.css';

function DoctorHome() {
  const [date, setDate] = useState(new Date());
  //sample data 
  const [appointments, setAppointments] = useState([
    { time: '9:00 AM', date: '2025-04-18', status: 'Pending' },
    { time: '10:30 AM', date: '2025-04-19', status: 'Accepted' },
    { time: '1:00 PM', date: '2025-04-20', status: 'Pending' },
    
  ]);
  const [activeDate, setActiveDate] = useState(null);

  const handleDateClick = (value) => {
    setDate(value);
    setActiveDate(value);
  };

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    const dateStr = date.toLocaleDateString('en-CA');
    const hasAppointment = appointments.some(app => app.date === dateStr);
    const isPast = date < new Date(today.setHours(0, 0, 0, 0));
    const isSunday = date.getDay() === 0;

    if (view === 'month') {
      return [
        hasAppointment ? 'has-appointment' : '',
        isPast ? 'past-date' : '',
        isSunday ? 'sunday-date' : ''
      ].join(' ');
    }

    return '';
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
            <div className="appointments-list-scroll">
              <ul>
                {appointments.map((appointment, index) => (
                  <li key={index}>
                    <span className="time">{appointment.time}</span>
                    <span className="date">
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        year: '2-digit',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </span>
                    <span className="status">{appointment.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DoctorHome;
