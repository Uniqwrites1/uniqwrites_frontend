import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceSection from "../components/ServiceSection";
import PurposeActionPoint from "../components/PurposeActionPoint";
import TutorApplyButton from "../components/common/TutorApplyButton";
import { parentServices, schoolServices, teacherServices } from "../data/servicesData";

export default function ServicesUpdated() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleServiceBooking = (role: string) => {
    setIsDropdownOpen(false); // Close dropdown when selecting a choice
    switch (role) {
      case 'parent':
        navigate('/ParentTutoringRequestForm');
        break;
      case 'student':
        navigate('/StudentEnrollment');
        break;
      case 'teacher':
        navigate('/apply-tutor');
        break;
      case 'school':
        navigate('/SchoolServiceRequestForm');
        break;
      default:
        navigate('/');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">      {/* Banner Section */}
      <div className="relative py-16 px-4 bg-black">
        <div className="absolute inset-0 bg-black opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Empowering education through personalized learning solutions for parents, schools, and teachers.
          </p>
        </div>
      </div>{/* Services Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ServiceSection title="For Parents/Guardians" services={parentServices} />
        <div className="text-center mt-6 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            onKeyDown={handleKeyDown}
          >
            Request a Tutor
            <svg
              className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded shadow-lg z-10 border border-gray-200"
              role="menu"
              aria-label="Request a Tutor submenu"
            >
              <button
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none text-black"
                role="menuitem"
                onClick={() => handleServiceBooking('parent')}
                onKeyDown={handleKeyDown}
              >
                Parent/Guardian
              </button>
              <button
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none text-black border-t border-gray-100"
                role="menuitem"
                onClick={() => handleServiceBooking('student')}
                onKeyDown={handleKeyDown}
              >
                Students
              </button>
            </div>
          )}
        </div>

        <div className="my-12 border-t border-gray-200"></div>

        <ServiceSection title="For Schools" services={schoolServices} />
        <div className="text-center mt-8">
          <button
            onClick={() => handleServiceBooking('school')}
            className="inline-flex items-center px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Request School Services
          </button>
        </div>        <div className="my-12 border-t border-gray-200"></div>

        <ServiceSection title="For Teachers" services={teacherServices} />
        <div className="text-center mt-6">
          <TutorApplyButton 
            variant="primary" 
            className="inline-flex items-center px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-lg"
          >
            Become a Tutor
          </TutorApplyButton>
        </div>

        <div className="mt-12">
          <PurposeActionPoint />
        </div>
      </div>
    </main>
  );
}

