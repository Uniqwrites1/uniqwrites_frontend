import React, { useState } from "react";
import examPrepImage from "../assets/images/examprep.png";
import homeschoolingImage from "../assets/images/homeschooling.png";
import homeTutoringImage from "../assets/images/hometutoring.png";
import homeworkHelpImage from "../assets/images/homework.png";
import virtualLearningImage from "../assets/images/virtuallearning.png";

const services = [
  {
    title: "Home Tutoring",
    description:
      "One-on-One & Group Tutoring: Personalized learning tailored to individual needs or collaborative sessions that encourage peer engagement and shared knowledge.",
    image: homeTutoringImage,
  },
  {
    title: "Virtual & Physical Lessons",
    description:
      "Flexible learning options—join classes from anywhere online or experience face-to-face instruction for hands-on guidance.",
    image: virtualLearningImage,
  },
  {
    title: "Homework Help",
    description:
      "Expert support to simplify complex assignments, reinforce understanding, and boost academic confidence.",
    image: homeworkHelpImage,
  },
  {
    title: "Homeschooling",
    description:
      "A structured, student-centered approach to education at home, ensuring personalized learning at the right pace.",
    image: homeschoolingImage,
  },
  {
    title: "Examination Prep",
    description:
      "Comprehensive coaching with proven strategies to help students excel in standardized tests and secure top scores (SAT, IGCSE, WAEC, NECO, JAMB, & more).",
    image: examPrepImage,
  },
];

const HighlightServices = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-10 bg-white">
      <h2 className="text-xl font-semibold mb-6">We are the best for :</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {services.map((service, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={service.title}
              className={`p-4 border rounded shadow-md cursor-pointer transition-all duration-300 ease-in-out ${
                isExpanded ? "bg-yellow-50 scale-105" : "bg-white"
              }`}
              tabIndex={0}
              role="button"
              aria-pressed={isExpanded}
              onClick={() => toggleExpand(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleExpand(index);
                }
              }}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-24 object-contain rounded mb-4"
              />
              <p className="text-sm font-medium">{service.title}</p>
              {isExpanded && (
                <p className="mt-2 text-xs text-gray-600">{service.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HighlightServices;
