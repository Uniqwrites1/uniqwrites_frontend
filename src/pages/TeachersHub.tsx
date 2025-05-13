import React from "react";

const TeachersHub = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary mb-6">
          Teachers' Hub
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to the Teachers' Hub! Here, you can find resources, job
          opportunities, and training programs to enhance your teaching skills
          and career.
        </p>
        <h2 className="text-3xl font-bold text-secondary mb-4">Resources</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Access free teaching materials and strategies.</li>
          <li>Join training and certification programs.</li>
          <li>
            Explore job opportunities in various educational institutions.
          </li>
        </ul>
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Job Opportunities
        </h2>
        <p className="text-gray-600 mb-6">
          Check out the latest job openings for tutors and educators. Apply now
          to join our team and make a difference in students' lives!
        </p>
      </div>
    </div>
  );
};

export default TeachersHub;
