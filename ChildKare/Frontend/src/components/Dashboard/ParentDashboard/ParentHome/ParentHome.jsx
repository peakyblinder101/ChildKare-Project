import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ParentHome.css";

function ParentHome() {
  const [babyDetails, setBabyDetails] = useState(null);

  useEffect(() => {
    const savedChild = localStorage.getItem("selectedChild");
    if (savedChild) {
      setBabyDetails(JSON.parse(savedChild));
    }
  }, []);

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

  const events = [
    { title: "Vacation", description: "Family vacation trip planned." },
    { title: "Checkup", description: "Routine checkup for the baby." },
    { title: "Parent Event", description: "Parenting seminar on child development." },
    { title: "Baby Event", description: "First baby milestone celebration." },
    { title: "Updates", description: "Important updates for parents." },
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
            {babyDetails ? (
              <ul>
                <li><strong>ID:</strong> {babyDetails.id}</li>
                <li><strong>First Name:</strong> {babyDetails.firstname}</li>
                <li><strong>Last Name:</strong> {babyDetails.lastName}</li>
                <li><strong>Gender:</strong> {babyDetails.gender}</li>
                <li><strong>Weight:</strong> {babyDetails.weight}</li>
                <li><strong>Age (months):</strong> {babyDetails.age}</li>
                
              </ul>
            ) : (
              <p>No child selected. Please register and choose a baby.</p>
            )}
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

        <div className="schedule-section">
          <h3>Upcoming Events</h3>
          <div className="event-table-wrapper">
            <table className="event-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
}

export default ParentHome;
