import React from "react";
import SchoolServiceRequestForm from "../components/forms/school/SchoolServiceRequestForm";

const SchoolServiceRequest = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform form submission logic here
    window.location.href = "/signup?role=school";
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">School Service Request</h1>
        <p className="text-center text-gray-600 mb-8">
          Complete the form below to request educational services for your school
        </p>
        <SchoolServiceRequestForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default SchoolServiceRequest;

