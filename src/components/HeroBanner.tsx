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
    >
      <div className="md:w-1/2 bg-white bg-opacity-80 p-6 rounded">
        <h1 className="text-4xl font-extrabold mb-4">
          Empowering Learning,<br />
          Connecting Educators,<br />
          Transforming Futures!
        </h1>
        <p className="text-gray-600 mb-6">...Education with you in mind…</p>
        <div className="flex gap-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                onClick={() => navigate("/ParentTutoringRequestForm")}                onKeyDown={handleKeyDown}
                onClick={() => handleMenuItemClick('/ParentTutoringRequestForm')}
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
          )}
          <button
            className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500"
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

