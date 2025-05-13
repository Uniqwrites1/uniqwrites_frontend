// File: src/components/QuickServiceLinks.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import TutorApplyButton from "./common/TutorApplyButton";

interface LinkType {
  name: string;
  path: string;
  role?: string;
}

const links: LinkType[] = [
  { name: "Request a Tutor", path: "/ParentTutoringRequestForm", role: "parent" },
  { name: "Become a Tutor", path: "/apply-tutor", role: "teacher" },
  { name: "School Services", path: "/SchoolServiceRequestForm", role: "school" },
  { name: "Join PAP", path: "/PurposeActionPoint" },
  { name: "Sponsor Initiatives", path: "/initiatives" },
];

const QuickServiceLinks = () => {
  const navigate = useNavigate();

  const handleLinkClick = (link: LinkType) => {
    if (link.role) {
      // For first three links (Request a Tutor, Become a Tutor, School Services),
      // navigate to the specific form first
      switch (link.role) {
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
          // Fallback to original behavior
      navigate(`/signup?role=${link.role}`);
    }
    } else {
      // Navigate to the specified path
      navigate(link.path);
    }
  };

  return (
    <section className="px-6 py-10">
      <h2 className="text-lg font-semibold mb-4">Quick service links</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">        {links.map((link) => (
          link.role === 'teacher' ? (
            <TutorApplyButton
              key={link.name}
              variant="primary"
              className="text-sm"
            >
              {link.name}
            </TutorApplyButton>
          ) : (
            <button
              key={link.name}
              className="border border-primary px-4 py-2 text-sm rounded text-secondary hover:bg-primary hover:bg-opacity-20 hover:border-primary-dark transition-all focus:outline-none focus:ring-2 focus:ring-primary-dark text-center"
              onClick={() => handleLinkClick(link)}
            >
              {link.name}
            </button>
          )
        ))}
      </div>
    </section>
  );
};

export default QuickServiceLinks;

