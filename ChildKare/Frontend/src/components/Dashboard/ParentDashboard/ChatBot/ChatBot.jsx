import React from "react";
import { Carousel } from "react-responsive-carousel"; // Correct import for the carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import "./ChatBot.css"; // Import the CSS for chatbot section

function ChatBot() {
  // Parenting Tips data
  const tips = [
    {
      title: "Parenting Tip #1",
      description:
        "Learn how to deal with tantrums effectively. Children can have challenging emotions...",
      link: "https://kidshealth.org/en/parents/guide-parents.html",
    },
    {
      title: "Child's Vaccination Tips",
      description:
        "Vaccinations are essential for your child's health. Here's why you should stay up-to-date...",
      link: "https://www.unicef.org/parenting/health/parents-frequently-asked-questions-vaccines",
    },
  ];

  return (
    <div className="child-tips-wrapper">
      <div className="child-tips">
        <h3>Parenting Tips</h3>
        {/* Carousel component with autoplay */}
        <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false}>
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
  );
}

export default ChatBot;
