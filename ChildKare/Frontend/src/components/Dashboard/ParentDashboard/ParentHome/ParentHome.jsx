import React from "react";
import { Carousel } from "react-responsive-carousel"; // Correct import for the carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./ParentHome.css";

function ParentHome() {
  // Define baby details for the left section
  const babyDetails = {
    firstName: "Ashley",
    lastName: "Williams",
    weight: "3.5 kg",
    gender: "Female",
    monthsOld: 6
  };

  // Define Parenting Tips
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

  // Upcoming Events with their titles
  const events = [
    { title: "Vacation", description: "Family vacation trip planned." },
    { title: "Checkup", description: "Routine checkup for the baby." },
    { title: "Parent Event", description: "Parenting seminar on child development." },
    { title: "Baby Event", description: "First baby milestone celebration." },
    { title: "Updates", description: "Important updates for parents." },
  ];

  return (
    <div className="parent-home">
      <div className="home-main-content-wrapper">
      <div className="home-main-content">
        {/* Baby Details Section */}
        <div className="baby-details">
          <h3>Baby Details</h3>
          <ul>
            <li><strong>First Name:</strong> {babyDetails.firstName}</li>
            <li><strong>Last Name:</strong> {babyDetails.lastName}</li>
            <li><strong>Weight:</strong> {babyDetails.weight}</li>
            <li><strong>Gender:</strong> {babyDetails.gender}</li>
            <li><strong>Months Old:</strong> {babyDetails.monthsOld}</li>
          </ul>
        </div>

        {/* Parenting Tips Section with Carousel */}
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
      </div>

      {/* Schedule Section */}
      <div className="schedule-section">
        <h3>Upcoming Events</h3>
        <div className="event-cards">
          {events.map((event, index) => (
            <div className="event-card" key={index}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default ParentHome;
