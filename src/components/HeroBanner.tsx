import React, { useState, useRef, useEffect } from "react";
import heroVisual from "../assets/images/Hero_visuals.jpg";
import { useNavigate } from "react-router-dom";
import TutorApplyButton from "./common/TutorApplyButton";

const HeroBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle menu item click
  const handleMenuItemClick = (path: string) => {
    setIsOpen(false); // Close dropdown
    navigate(path); // Use navigate for internal routing
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <section
      className="flex flex-col md:flex-row items-center gap-6 py-16 px-6 bg-cover bg-center rounded"
      style={{ backgroundImage: `url(${heroVisual})`, minHeight: "400px" }}
    >      <div className="md:w-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow-xl border-l-4 border-primary">
        <h1 className="text-5xl font-black mb-6 text-secondary leading-tight drop-shadow-sm">
          Empowering Learning,<br />
          Connecting Educators,<br />
          <span className="text-primary">Transforming Futures!</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-semibold">...Education with you in mind…</p>        <div className="flex gap-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary text-secondary font-black px-8 py-3 rounded-lg hover:bg-primary-light transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-light shadow-lg text-lg"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onKeyDown={handleKeyDown}
          >
            Get Started
          </button>
          {isOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-48 bg-white rounded shadow-lg z-10"
              role="menu"
              aria-label="Get Started submenu"
            >              <TutorApplyButton
                variant="secondary"
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none"
              >
                Tutors
              </TutorApplyButton>
              <button
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none"
                role="menuitem"
                onClick={() => handleMenuItemClick('/StudentEnrollment')}
                onKeyDown={handleKeyDown}
              >
                Students
              </button>
              <button
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none"
                role="menuitem"
                onClick={() => handleMenuItemClick('/ParentTutoringRequestForm')}
                onKeyDown={handleKeyDown}
              >
                Parent/Guardians
              </button>
              <button
                className="block w-full text-left font-bold px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none"
                role="menuitem"
                onClick={() => navigate("/SchoolServiceRequestForm")}
                onKeyDown={handleKeyDown}
              >
                School admins
              </button>
            </div>
          )}          <button
            className="bg-secondary text-primary font-black px-8 py-3 rounded-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg border-2 border-primary"
            onClick={() => navigate("/services")}
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;

