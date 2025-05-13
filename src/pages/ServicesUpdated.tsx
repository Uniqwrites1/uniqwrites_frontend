import { useNavigate } from "react-router-dom";
import ServiceSection from "../components/ServiceSection";
import PurposeActionPoint from "../components/PurposeActionPoint";
import { parentServices, schoolServices, teacherServices } from "../data/servicesData";
import servicesPageBg from "../assets/images/services_pagebg.jpg"; // Importing the background image

export default function ServicesUpdated() {
  const navigate = useNavigate();
  return (
    <main
      className="container mx-auto px-4 pt-20 main-background"
      style={{
        backgroundImage: `url(${servicesPageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures the background covers the full height
      }}
    >      <ServiceSection title="For Parents/Guardians" services={parentServices} />
      <button 
        onClick={() => navigate("/ParentTutoringRequestForm")}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Request a Tutor
      </button>

      <ServiceSection title="For Schools" services={schoolServices} />
      <button 
        onClick={() => navigate("/SchoolServiceRequestForm")}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Request School Services
      </button>

      <ServiceSection title="For Teachers" services={teacherServices} />
      <button 
        onClick={() => navigate("/apply-tutor")}
        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
      >
        Become a Tutor
      </button>

      <PurposeActionPoint />
    </main>
  );
}
