import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, Mail, ChevronUp } from 'lucide-react';

const WhatsAppBotPolicies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL to decide which tab to show
    if (location.hash === '#terms') {
      setActiveTab('terms');
    } else if (location.hash === '#privacy') {
      setActiveTab('privacy');
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="relative py-16 px-4 bg-black">
        <div className="absolute inset-0 bg-black opacity-90"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4">
            WhatsApp Bot Policies
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Privacy Policy and Terms of Service for the Uniqwrites WhatsApp Bot
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-4 px-6 flex items-center justify-center font-semibold transition-all duration-300 ${
              activeTab === 'privacy'
                ? 'bg-yellow-400 text-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-5 h-5 mr-2" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-4 px-6 flex items-center justify-center font-semibold transition-all duration-300 ${
              activeTab === 'terms'
                ? 'bg-yellow-400 text-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Terms of Service
          </button>
        </div>

        {/* Privacy Policy Content */}
        {activeTab === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Privacy Policy – Uniqwrites WhatsApp Bot</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 17th, 2025
            </p>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                Uniqwrites ("we," "our," or "us") values your privacy. This Privacy Policy explains how we collect, use, and protect the information you provide when interacting with the Uniqwrites WhatsApp Bot ("the Bot").
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
                  <div className="ml-4 space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">User-Provided Information:</h4>
                      <p className="text-gray-700">Messages you send through the Bot, including tutoring requests, service inquiries, or feedback.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Automatic Information:</h4>
                      <p className="text-gray-700">Basic metadata such as your phone number, timestamps, and delivery reports, as provided by WhatsApp.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Information</h3>
                  <p className="text-gray-700 mb-3">We use your information to:</p>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>Provide tutoring, school services, and related educational support.</li>
                    <li>Improve our services and personalize your experience.</li>
                    <li>Respond to your inquiries, feedback, or requests.</li>
                    <li>Send important notifications about your interactions with Uniqwrites.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Data Sharing</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>We do not sell or rent your personal information.</li>
                    <li>Information may be shared only with trusted partners (e.g., tutors, schools) to fulfill your requests.</li>
                    <li>We may disclose information if required by law or to protect our rights.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h3>
                  <p className="text-gray-700">
                    We use industry-standard measures to protect your information, but no system is completely secure.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Your Rights</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>You may request access, correction, or deletion of your personal information by contacting us.</li>
                    <li>You may stop using the Bot at any time by messaging "STOP."</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Contact</h3>
                  <p className="text-gray-700 mb-3">If you have questions about this Privacy Policy, please contact us at:</p>
                  <div className="flex items-center text-yellow-600">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:info@uniqwrites.africa" className="hover:underline">
                      info@uniqwrites.africa
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}

        {/* Terms of Service Content */}
        {activeTab === 'terms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <FileText className="w-8 h-8 text-yellow-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Terms of Service – Uniqwrites WhatsApp Bot</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 17th, 2025
            </p>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6">
                These Terms of Service ("Terms") govern your use of the Uniqwrites WhatsApp Bot ("the Bot"). By using the Bot, you agree to these Terms.
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Service Description</h3>
                  <p className="text-gray-700">
                    The Bot connects parents, students, teachers, and schools to Uniqwrites' educational services, including tutoring, teacher recruitment, and initiatives.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. User Responsibilities</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>You must provide accurate information when using the Bot.</li>
                    <li>You agree not to use the Bot for unlawful, harmful, or fraudulent purposes.</li>
                    <li>You are responsible for keeping your WhatsApp account secure.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Communication</h3>
                  <p className="text-gray-700">
                    By using the Bot, you consent to receive automated messages from Uniqwrites related to your requests or services.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h3>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    <li>The Bot is provided "as is." We make no guarantees of uninterrupted service or error-free performance.</li>
                    <li>We are not liable for damages arising from the use of the Bot, except as required by law.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Termination</h3>
                  <p className="text-gray-700">
                    We reserve the right to suspend or terminate access to the Bot if you violate these Terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Changes</h3>
                  <p className="text-gray-700">
                    We may update these Terms from time to time. Continued use of the Bot after updates constitutes your acceptance.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Governing Law</h3>
                  <p className="text-gray-700">
                    These Terms are governed by the laws of the Federal Republic of Nigeria.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Contact</h3>
                  <p className="text-gray-700 mb-3">For questions about these Terms, please contact:</p>
                  <div className="flex items-center text-yellow-600">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:info@uniqwrites.africa" className="hover:underline">
                      info@uniqwrites.africa
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back to Top Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Top
            <ChevronUp className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBotPolicies;
