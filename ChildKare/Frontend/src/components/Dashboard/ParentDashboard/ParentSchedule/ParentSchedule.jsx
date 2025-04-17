import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ParentSchedule.css';

function ParentSchedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([
    { time: '9:00 AM', doctor: 'Dr. Smith', date: '2025-04-18' },
    { time: '10:30 AM', doctor: 'Dr. Johnson', date: '2025-04-19' },
    { time: '1:00 PM', doctor: 'Dr. Lee', date: '2025-04-20' }
  ]);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAppointmentFormStep, setIsAppointmentFormStep] = useState(false);
  const [activeDate, setActiveDate] = useState(null);

  const doctorList = [
    {
      name: 'Dr. Smith',
      specialization: 'Cardiology',
      imageUrl: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg',
      contact: '123-456-7890',
      license: 'LIC123456',
      address: '123 Heart St, Health City',
      description: 'Experienced cardiologist specializing in heart diseases.'
    },
    {
      name: 'Dr. Johnson',
      specialization: 'Neurology',
      imageUrl: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg',
      contact: '234-567-8901',
      license: 'LIC987654',
      address: '456 Brain Ave, Neurotown',
      description: 'Expert neurologist with years of experience in brain and spinal cord disorders.'
    },
    {
      name: 'Dr. Lee',
      specialization: 'Dermatology',
      imageUrl: 'https://img.freepik.com/free-photo/mother-baby-laying-bed_1150-18379.jpg',
      contact: '345-678-9012',
      license: 'LIC543210',
      address: '789 Skin Blvd, Dermaville',
      description: 'Specializes in skin conditions and cosmetic dermatology.'
    }
  ];

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsAppointmentModalOpen(true);
    setIsAppointmentFormStep(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleMakeAppointment = () => {
    const appointment = {
      ...newAppointment,
      doctor: selectedDoctor.name,
    };

    setAppointments([...appointments, appointment]);
    setIsAppointmentModalOpen(false);
    setSelectedDoctor(null);
    setNewAppointment({ date: '', time: '', reason: '' });
  };

  const handleCloseModal = () => {
    setIsAppointmentModalOpen(false);
    setSelectedDoctor(null);
    setIsAppointmentFormStep(false);
  };

  const handleProceedToAppointmentForm = () => {
    setIsAppointmentFormStep(true);
  };

  const handleDateClick = (value) => {
    const dateStr = value.toLocaleDateString('en-CA'); // Fix: Use local date
    const foundAppointment = appointments.find(app => app.date === dateStr);

    if (foundAppointment) {
      setNewAppointment({ date: dateStr, time: foundAppointment.time, reason: foundAppointment.reason || '' });
      const matchedDoctor = doctorList.find(doc => doc.name === foundAppointment.doctor);
      setSelectedDoctor(matchedDoctor);
      setIsAppointmentModalOpen(true);
      setIsAppointmentFormStep(true);
    }

    setDate(value);
    setActiveDate(value);
  };

  const tileClassName = ({ date, view }) => {
    const today = new Date();
    const dateStr = date.toLocaleDateString('en-CA'); // Fix: Use local date

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
    <div className="parent-schedule">
      <h1>Appointment Schedule</h1>

      <div className="schedule-wrapper">
        <div className="schedule-container">

          {/* Doctors Section */}
          <div className="doctors-list">
            <h2>Doctors</h2>
            <ul className="doctor-items">
              {doctorList.map((doctor, index) => (
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

          {/* Calendar Section */}
          <div className="calendar">
            <h2>Calendar</h2>
            <Calendar
              onChange={handleDateClick}
              value={date}
              tileClassName={tileClassName}
              calendarType="US" // Ensures Sunday starts first
            />
          </div>

          {/* Appointments Section */}
          <div className="appointments-list">
            <h2>Appointments</h2>
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index}>
                  <span className="time">{appointment.time}</span>
                  <span className="date">{appointment.date}</span>
                  <span className="doctor-name">{appointment.doctor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="appointment-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>X</span>

            {/* Step 1: Doctor Info */}
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

            {/* Step 2: Appointment Form */}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentSchedule;
