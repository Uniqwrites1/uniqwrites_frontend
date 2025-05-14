import React from "react";
import { ArrowRight, Compass, Lightbulb, HandshakeIcon, GraduationCap, Milestone } from 'lucide-react';
import heroImage from '../assets/images/seth-doyle-zf9_yiAekJs-unsplash.jpg';

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flex-shrink-0 w-full md:w-72 p-6 bg-white border-2 border-black hover:border-yellow-400 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl group">
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-full bg-black group-hover:bg-yellow-400 transition-colors">
          {React.cloneElement(icon as React.ReactElement, { 
            className: "w-8 h-8 text-yellow-400 group-hover:text-black"
          })}
        </div>
      </div>
      <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

const valuePoints = [
  {
    icon: <Compass />,
    title: "Align Passion with Purpose",
    description: "Choose career paths that are fulfilling, meaningful, and suited to your strengths."
  },
  {
    icon: <Lightbulb />,
    title: "Discover Unique Identity",
    description: "Unlock hidden potential and personal strengths for long-term success."
  },
  {
    icon: <HandshakeIcon />,
    title: "Develop Essential Life Skills",
    description: "Gain confidence, adaptability, and readiness for the future."
  },
  {
    icon: <GraduationCap />,
    title: "Fill Learning Gaps",
    description: "Get remedial coaching in core subjects and strengthen foundations."
  },
  {
    icon: <Milestone />,
    title: "Prepare for Real-Life Challenges",
    description: "Navigate emotional, social, and academic challenges with clarity and resilience."
  }
];

const PurposeActionPoint = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4">
            Purpose Action Point (PAP)
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
            Equipping Young Minds for Life, Not Just Exams.
          </p>
        </div>
      </div>

      {/* About the Program */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">
            About the Program
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            PAP is a 9-month transformational coaching and mentoring program for high school graduates. 
            It's more than just career guidance—it's a life-shaping experience that helps students:
          </p>

          {/* Value Points Cards */}
          <div className="flex gap-6 overflow-x-auto pb-6 px-4 -mx-4 scrollbar-hide">
            {valuePoints.map((point, index) => (
              <ValueCard
                key={index}
                icon={point.icon}
                title={point.title}
                description={point.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-black opacity-95"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8">
            🌟 Coming Soon: A Program That Transforms More Than Just Grades.
          </h2>
          <p className="text-lg text-white mb-8">
            At Uniqwrites, we believe purpose is the foundation of every meaningful journey.<br/><br/>
            The Purpose Action Point (PAP) is almost here—and when it launches, it will change how we prepare students for life, not just academics.
          </p>
          <p className="text-xl text-yellow-400 font-semibold">
            Stay with us.<br/>
            The future isn't waiting—and neither should your purpose.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurposeActionPoint;
