import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceSection from "../components/ServiceSection";
import PurposeActionPoint from "../components/PurposeActionPoint";
import TutorApplyButton from "../components/common/TutorApplyButton";
import { parentServices, schoolServices, teacherServices } from "../data/servicesData";

export default function ServicesUpdated() {
  const navigate = useNavigate();

  const handleServiceBooking = (role: string) => {
    switch (role) {
      case 'parent':
        navigate('/ParentTutoringRequestForm');
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
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">      {/* Hero Section */}
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
        <div className="text-center mt-6">
          <button
            onClick={() => handleServiceBooking('parent')}
            className="inline-flex items-center px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-lg"
          >
            Request a Tutor
          </button>
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

