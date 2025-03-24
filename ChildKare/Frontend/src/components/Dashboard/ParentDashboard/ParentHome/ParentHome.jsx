import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Carousel } from "react-responsive-carousel"; // Correct import
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ParentHome.css";

function ParentHome({ setContent }) { // Receive setContent as a prop
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tips = [
    {
      title: "Parenting Tip #1",
      description: "Learn how to deal with tantrums effectively. Children can have challenging emotions...",
      link: "https://kidshealth.org/en/parents/guide-parents.html",
    },
    {
      title: "Child's Vaccination Tips",
      description: "Vaccinations are essential for your child's health. Here's why you should stay up-to-date...",
      link: "https://www.unicef.org/parenting/health/parents-frequently-asked-questions-vaccines",
    },
  ];

  const handleProfileClick = () => {
    setContent('Parent Profile'); // Switch to Parent Profile when profile card is clicked
  };

  return (
    <div className="parent-home">
      <div className="profile-card" onClick={handleProfileClick}>
        <div className="greeting">
          <h2>Hello, Mother</h2>
          <p>Jane Doe</p>
        </div>
        <div className="profile-image">
          <img
            src="/src/components/Landing/LandingImage/logo5.png"
            alt="Parent"
          />
        </div>
        
      </div>

      <div className="main-content">
        {/* Tips Section */}
        <div className="tips-section">
          <h3>Parenting Tips</h3>
          <Carousel autoPlay infiniteLoop interval={3000}>
            {tips.map((tip, index) => (
              <div key={index}>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
                <a
                  href={tip.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More
                </a>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Calendar Section */}
        <div className="calendar-section">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            calendarType="US"
            className="calendar"
          />
          <div className="event-info">
            <h4>Upcoming Events</h4>
            <ul>
              <li>March 27, 2025: Children's Check-up</li>
              <li>April 5, 2025: Family Vacation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentHome;
