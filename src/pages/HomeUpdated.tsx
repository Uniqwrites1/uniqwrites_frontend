import { ArrowRight, BookOpen, Users, School, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const HomeUpdated = () => {
  const [, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary via-secondary to-primary/10 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Empowering Learning, Connecting Educators,{" "}
              <span className="text-primary">Transforming Futures!</span>
            </motion.h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Discover a world of learning opportunities with Uniqwrites.
              Whether you're seeking quality education or looking to make an
              impact in education, we're here to help you succeed.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[{
                id: 1,
                to: "/request-tutor",
                label: "Get a Tutor",
                className: "bg-primary text-secondary",
                icon: <ArrowRight className="ml-2" />
              }, {
                id: 2,
                to: "/become-tutor",
                label: "Become a Tutor",
                className: "bg-white text-secondary"
              }, {
                id: 3,
                to: "/hire-educators",
                label: "For Schools",
                className: "border-2 border-primary text-white"
              }, {
                id: 4,
                to: "/partner-with-us",
                label: "Partner with Us",
                className: "border-2 border-white text-white"
              }].map(({ id, to, label, className, icon }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0,0,0,0.3)" }}
                  onHoverStart={() => setHovered(id)}
                  onHoverEnd={() => setHovered(null)}
                  className={`rounded-md font-bold flex items-center justify-center cursor-pointer transition-colors ${className} px-6 py-3`}
                >
                  <Link to={to} className="flex items-center">
                    {label} {icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="/src/assets/images/literacy.jpg"
                alt="Literacy Program"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Literacy Program</h3>
              <p className="text-gray-600">
                Intensive literacy immersion outreach to empower students with essential reading and writing skills.
              </p>
            </motion.div>
            <motion.div
              className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="/src/assets/images/back_to_school.jpg"
                alt="Back to School Program"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Back to School Program</h3>
              <p className="text-gray-600">
                Support for children and youths to return to school and continue their education journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-primary text-secondary px-6 py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">For Parents/Students</h3>
              <p className="text-gray-600 mb-4">
                Personalized one-on-one and group tutoring sessions for all
                subjects and levels.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">For Teachers</h3>
              <p className="text-gray-600 mb-4">
                Resources and support for educators to thrive in their
                profession.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <School className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">For Schools</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive educational solutions for institutions, including
                digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-primary fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Uniqwrites has transformed my child's learning experience.
                  The personalized attention and expert tutoring have made a
                  remarkable difference."
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      i === 1
                        ? "1494790108377-be9c29b29330"
                        : i === 2
                        ? "1438761681033-6461ffad8d80"
                        : "1472099645785-5658abf4ff4e"
                    }?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`}
                    alt="Testimonial"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Parent Name</h4>
                    <p className="text-gray-500 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Link
              to="/blog"
              className="text-primary hover:text-primary-dark font-medium flex items-center"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    i === 1
                      ? "1503676260728-1c00da094a0b"
                      : i === 2
                      ? "1456513080510-7bf3a84b82f8"
                      : "1522202176988-66273c2fd55f"
                  }?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                  alt="Blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Educational Tips for Parents
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Practical advice for supporting your child's learning
                    journey at home.
                  </p>
                  <Link
                    to="/blog/1"
                    className="text-primary hover:text-primary-dark font-medium flex items-center"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeUpdated;
