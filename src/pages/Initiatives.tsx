import React, { useState } from "react";
import literacyImage from "../assets/images/literacy.jpg"; // Placeholder for Literacy Initiative image
import initiativeBackgroundImage from "../assets/images/initiative_background_image.jpg"; // Placeholder for Back-to-School Initiative image
import { Link } from "react-router-dom";

const Initiatives = () => {
  const [isLiteracyOpen, setLiteracyOpen] = useState(false);
  const [isBackToSchoolOpen, setBackToSchoolOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 align-start">
          {/* Literacy Immersion Outreach Section */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col relative">
            <img
              src={literacyImage}
              alt="Literacy Initiative"
              className="mb-4 rounded-lg animate-fade-in"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h1 className="text-3xl font-bold text-black mb-2">Literacy Immersion Outreach</h1>
            
            <div style={{ marginBottom: "60px" }}>
              <p className="text-lg text-gray-600 mb-4">
                Imagine a world where a child's potential is never limited by their ability to read. Yet, for many students in public secondary schools, literacy remains a barrier—blocking their dreams, confidence, and future opportunities. We believe that every individual deserves the power of literacy, no matter their background or circumstances. That's why we are launching the Literacy Immersion Outreach—a bold initiative to reach those who, for any reason, missed the opportunity to become literate at the expected time.
              </p>
              
              {isLiteracyOpen && (
                <div>
                <p className="text-lg text-gray-600 mb-2">
                    <strong>Why This Matters</strong><br />
                    Without the ability to read, write, and communicate effectively, students are denied access to limitless opportunities in education, personal growth, and economic participation.
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>The Story That Inspired This Mission</strong><br />
                    When I was in primary school, I struggled with literacy. I was constantly behind in class, and no matter how hard I tried, I just couldn't keep up. But everything changed when a literacy specialist used unique techniques to teach me how to read. Almost overnight, I went from being at the bottom of the class to excelling beyond expectations. That transformation changed my life, and I never forgot the children who lost interest in school simply because reading was a challenge they couldn't overcome.
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>Our Mission</strong><br />
                    We are stepping into public secondary schools—where countless students still struggle with reading, spelling, and speaking the language that is key to their future. Through intensive literacy programs, we will equip them with the skills they need to thrive.
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    <strong>Join the Movement</strong><br />
                    This is more than just an initiative—it's a lifeline for students who have been left behind. Partner with us to break the cycle of illiteracy and unlock a future where no child is left in the shadows of their own potential.
                </p>
                  <div className="mb-4">
                    <Link
                      to="#"
                      className="bg-primary text-white px-4 py-2 rounded-md font-bold hover:bg-primary-dark transition-colors text-center mr-2"
                    >
                      Become a Sponsor
                    </Link>
                    <Link
                      to="#"
                      className="bg-primary text-white px-4 py-2 rounded-md font-bold hover:bg-primary-dark transition-colors text-center"
                    >
                      Join as a Volunteer
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => setLiteracyOpen(!isLiteracyOpen)}
                className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-opacity-80 transition-colors text-center w-full"
              >
                {isLiteracyOpen ? "Show Less" : "Learn More"}
              </button>
    </div>
          </div>

          {/* Back-to-School Initiative Section */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col relative">
            <img
              src={initiativeBackgroundImage}
              alt="Back to School Initiative"
              className="mb-4 rounded-lg animate-fade-in"
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h1 className="text-3xl font-bold text-black mb-2">Back-to-School Initiative</h1>
            
            <div style={{ marginBottom: "60px" }}>
              <p className="text-lg text-gray-600 mb-4">
                For too many children and youths, education is not a right—it's a lost dream. They once walked into classrooms full of hope, but somewhere along the way, life happened. Poverty, family struggles, discouragement, or learning difficulties pushed them out, and now, the streets have become their new classrooms. But we refuse to let dreams fade and potentials go untapped.
              </p>

              {isBackToSchoolOpen && (
                <div>
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>Why This Matters</strong><br />
                    Every child deserves a second chance—a chance to sit in a classroom, to open a book without fear, and to believe that education is still within their reach. When a child is denied learning, they are denied a future, a voice, and a place in the world.
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>How We Make a Difference</strong><br />
                    We're taking action where it matters most—on the streets, in communities, and in forgotten places, seeking out those who have fallen through the cracks. We listen to their stories, understand their struggles, and work to remove the barriers keeping them from school. Whether it's providing financial aid, mentorship, tutoring, or simply reigniting their confidence, we will do whatever it takes to bring them back into learning spaces where they belong.
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    <strong>The Heart Behind This Mission</strong><br />
                    Imagine a child forced to trade school for survival. A brilliant mind, full of potential, now navigating life without the basic tools to thrive. What if that child had just one more chance? We are here to give that chance—to help them rediscover the power of education and find their way back to the classrooms where dreams are built and destinies are shaped.
                  </p>
                  <p className="text-lg text-gray-600 mb-4">
                    <strong>Join Us in Changing Lives</strong><br />
                    This is more than an initiative; it's a rescue mission for lost dreams. With your support, we can pull children out of the margins and place them back where they belong—in school, in hope, in a future they deserve. Every child deserves a comeback. Let's make it happen, together. Will you join us?
                  </p>
                  <div className="mb-4">
                    <Link
                      to="#"
                      className="bg-primary text-white px-4 py-2 rounded-md font-bold hover:bg-primary-dark transition-colors text-center mr-2"
                    >
                      Become a Sponsor
                    </Link>
                    <Link
                      to="#"
                      className="bg-primary text-white px-4 py-2 rounded-md font-bold hover:bg-primary-dark transition-colors text-center"
                    >
                      Join as a Volunteer
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={() => setBackToSchoolOpen(!isBackToSchoolOpen)}
                className="bg-black text-white px-4 py-2 rounded-md font-bold hover:bg-opacity-80 transition-colors text-center w-full"
              >
                {isBackToSchoolOpen ? "Show Less" : "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Initiatives;