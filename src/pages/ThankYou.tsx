import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home, Mail, Phone } from 'lucide-react';

interface LocationState {
  formType?: 'parent' | 'school' | 'teacher' | 'initiative';
  submitterName?: string;
  submitterEmail?: string;
}

const ThankYou: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  // Check for query parameters
  const searchParams = new URLSearchParams(location.search);
  const queryType = searchParams.get('type');
  
  const formTypeMessages = {
    parent: {
      title: 'Parent Tutoring Request Submitted!',
      message: 'Thank you for choosing Uniqwrites. We have received your tutoring request and our team will contact you within 24 hours to discuss the perfect tutor match for your child.',
      nextSteps: [
        'Our team will review your requirements',
        'We will match you with suitable tutors',
        'You will receive a call within 24 hours',
        'Schedule a consultation at your convenience'
      ]
    },
    student: {
      title: 'Student Enrollment Submitted!',
      message: 'Thank you for choosing Uniqwrites for your learning journey. We have received your enrollment request and our team will contact you within 24 hours to discuss the perfect tutor match for your studies.',
      nextSteps: [
        'Our team will review your academic needs',
        'We will match you with qualified tutors',
        'You will receive a call within 24 hours',
        'Schedule your first tutoring session'
      ]
    },
    school: {
      title: 'School Service Request Submitted!',
      message: 'Thank you for your interest in Uniqwrites school services. We have received your request and our education consultants will contact you within 48 hours to discuss your specific needs.',
      nextSteps: [
        'Our consultants will review your requirements',
        'We will prepare a customized service proposal',
        'You will receive a detailed consultation call',
        'Schedule an on-site visit if needed'
      ]
    },
    teacher: {
      title: 'Teacher Application Submitted!',
      message: 'Thank you for applying to join the Uniqwrites teaching team. We have received your application and our HR team will review it within 72 hours.',
      nextSteps: [
        'Our HR team will review your application',
        'We will verify your credentials and experience',
        'Qualified candidates will be contacted for an interview',
        'Complete our training program upon selection'
      ]
    },
    initiative: {
      title: 'Initiative Interest Submitted!',
      message: 'Thank you for your interest in supporting our educational initiatives. We have received your submission and our community outreach team will contact you soon.',
      nextSteps: [
        'Our team will review your interest',
        'We will match you with suitable initiatives',
        'You will receive information about upcoming programs',
        'Join our community of education advocates'
      ]
    },
    contact: {
      title: 'Message Sent Successfully!',
      message: 'Thank you for contacting Uniqwrites. We have received your message and our customer service team will respond within 24 hours.',
      nextSteps: [
        'Our team will review your message',
        'We will prepare a personalized response',
        'You will receive a reply within 24 hours',
        'Follow up if you need additional assistance'
      ]
    }
  };

  const currentForm = queryType || state?.formType || 'parent';
  const formData = formTypeMessages[currentForm as keyof typeof formTypeMessages] || formTypeMessages.contact;
  // Google Form links for confirmation
  const confirmationLinks: Record<string, { url: string; label: string }> = {
    parent: {
      url: 'https://forms.gle/PRBgkXqPP1fL72xu7',
      label: 'Parent/Guardian Registration Form',
    },
    student: {
      url: 'https://forms.gle/LnAFNp6q4PDR48rN6',
      label: 'Student Enrollment Form',
    },
    teacher: {
      url: 'https://forms.gle/FsAN8BuL4RE66ZL88',
      label: 'Teacher Registration Form',
    },
    school: {
      url: 'https://forms.gle/stpsdf8A8SMaMLqj7',
      label: 'School Services Request Form',
    },
    initiative_volunteer: {
      url: 'https://forms.gle/imZYNuLtVtb1KUy69',
      label: 'Initiative Volunteer Form',
    },
    initiative_sponsorship: {
      url: 'https://forms.gle/uGDV3JE2dFDHqCno7',
      label: 'Initiative Sponsorship Form',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-black text-yellow-400 text-center py-8 px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {formData.title}
            </h1>
            {state?.submitterName && (
              <p className="text-white opacity-90">
                Hello {state.submitterName}!
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {formData.message}
              </p>
              {state?.submitterEmail && (
                <p className="text-sm text-gray-600 mt-4">
                  A confirmation email has been sent to: <span className="font-semibold">{state.submitterEmail}</span>
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-black mb-4 flex items-center">
                <ArrowRight className="w-5 h-5 mr-2 text-yellow-600" />
                What Happens Next?
              </h3>
              <ul className="space-y-3">
                {formData.nextSteps.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-black text-sm font-bold rounded-full mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </motion.li>
                ))}
              </ul>
              {/* Confirmation Link Section */}
              {/* Initiative form type handling */}
              {(confirmationLinks[currentForm] ||
                (currentForm === 'initiative' && (confirmationLinks['initiative_volunteer'] || confirmationLinks['initiative_sponsorship']))) && (
                <div className="mt-8 text-center">
                  <p className="text-base text-gray-800 mb-3 font-medium">
                    To confirm the information you entered, please click the link below and review your submission:
                  </p>
                  {/* For initiative, show both volunteer and sponsorship links */}
                  {currentForm === 'initiative' ? (
                    <div className="flex flex-col gap-3 items-center">
                      <a
                        href={confirmationLinks['initiative_volunteer'].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-all duration-300"
                      >
                        {confirmationLinks['initiative_volunteer'].label}
                      </a>
                      <a
                        href={confirmationLinks['initiative_sponsorship'].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
                      >
                        {confirmationLinks['initiative_sponsorship'].label}
                      </a>
                    </div>
                  ) : (
                    <a
                      href={confirmationLinks[currentForm].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-all duration-300"
                    >
                      {confirmationLinks[currentForm].label}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-4">Need Immediate Assistance?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Email Us</p>
                    <p className="text-gray-600 text-sm">info@uniqwrites.africa</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Call Us</p>
                    <p className="text-gray-600 text-sm">Available 9 AM - 6 PM (WAT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-6 py-3 bg-black text-yellow-400 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Return to Home
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/services')}
                className="flex items-center justify-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-sm">
            Follow us on social media for educational tips and updates about our services.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
