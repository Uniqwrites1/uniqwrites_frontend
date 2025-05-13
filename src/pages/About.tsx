import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Our Mission Card */}
          <div className="text-center">
            <div className="bg-white shadow-lg rounded-lg p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-t-4 border-primary">
              <h2 className="text-4xl font-bold mb-6 text-secondary">Our Mission</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-8">
                Empowering learners, uplifting educators. We make education
                personalized, inclusive, and accessible through innovative
                digital solutions, ensuring every learner excels and every
                educator thrives.
              </p>
            </div>
          </div>

          {/* Our Vision Card */}
          <div className="text-center">
            <div className="bg-white shadow-lg rounded-lg p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-t-4 border-primary-dark">
              <h2 className="text-4xl font-bold mb-6 text-secondary">Our Vision</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                To make learning accessible to all by empowering students and
                educators through technology, personalization, and strong
                relationships. Uniqwrites—Education with You in Mind.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Core Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-secondary relative inline-block mx-auto">
            Our Values
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Core Value Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-primary">
              <h2 className="text-xl font-bold mb-4 text-secondary">Redefining Perspectives</h2>
              <p className="text-lg text-gray-700">
                Impossibilty is a perspective so we redefine it. We challenge the
                status quo and create new possibilities for learning and growth.
              </p>
            </div>

            {/* Core Value Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-primary-dark">
              <h2 className="text-xl font-bold mb-4 text-secondary">Activating Potential</h2>
              <p className="text-lg text-gray-700">
                Possibilities are rooted in potential. so we activate it. We
                believe in the power of every individual to learn, grow, and
                succeed.
              </p>
            </div>

            {/* Core Value Card 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-primary">
              <h2 className="text-xl font-bold mb-4 text-secondary">Facilitating Growth</h2>
              <p className="text-lg text-gray-700">
                Growth is the process so we embrace it. We foster a culture of
                continuous learning, improvement, and innovation for all.
              </p>
            </div>

            {/* Core Value Card 4 */}
            <div className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-primary-dark">
              <h2 className="text-xl font-bold mb-4 text-secondary">Creating Lasting Impact</h2>
              <p className="text-lg text-gray-700">
                Our work fosters joy, success, and a fulfilled life through
                meaningful impacts.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Team - Animated Card */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-8 text-secondary relative inline-block mx-auto">
            Our Team
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary"></span>
          </h2>
          
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto 
                        transition-all duration-500 transform hover:scale-105 
                        animate-fade-in-up border-b-4 border-primary">
            <p className="text-lg text-gray-700 leading-relaxed">
              We are real people from diverse backgrounds, sharing experiences
              that mirror yours. Each of us is driven by a deep passion for
              transforming learning into a personalized and impactful experience.
              We believe that education should be an opportunity for everyone—one
              that nurtures the whole person and empowers individuals to unlock
              their full potential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
