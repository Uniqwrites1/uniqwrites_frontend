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
    <main className="container mx-auto px-4 pt-20">
      <ServiceSection title="For Parents/Guardians" services={parentServices} />
      <button
        onClick={() => handleServiceBooking('parent')}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Request a Tutor
      </button>

      <ServiceSection title="For Schools" services={schoolServices} />
      <button
        onClick={() => handleServiceBooking('school')}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Request School Services
      </button>      <ServiceSection title="For Teachers" services={teacherServices} />
      <TutorApplyButton variant="primary" className="mt-4">
        Become a Tutor
      </TutorApplyButton>

      <PurposeActionPoint />
    </main>
  );
}

