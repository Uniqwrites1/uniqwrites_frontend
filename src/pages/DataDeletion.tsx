import React, { useState } from 'react';
import { Mail, Phone, AlertCircle, CheckCircle, Clock, Shield } from 'lucide-react';

const DataDeletion = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    requestType: 'all',
    reason: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Data deletion request:', formData);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Request Submitted Successfully
            </h1>
            <p className="text-gray-600 mb-6">
              Your data deletion request has been received. We will process your request within 30 days 
              and send you a confirmation email once completed.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Reference ID:</strong> DD-{Date.now()}
              </p>
              <p className="text-sm text-blue-800 mt-1">
                Please save this reference ID for your records.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Data Deletion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Request the deletion of your personal data from our systems. We are committed to 
            protecting your privacy and will process your request in accordance with applicable data protection laws.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What You Should Know
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Processing Time</h3>
                    <p className="text-sm text-gray-600">
                      We will process your request within 30 days of receipt.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">What Gets Deleted</h3>
                    <p className="text-sm text-gray-600">
                      Personal information, form submissions, communication history, and account data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Legal Compliance</h3>
                    <p className="text-sm text-gray-600">
                      Some data may be retained for legal or regulatory requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> This action cannot be undone. Please ensure you have downloaded 
                  any information you wish to keep before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Deletion Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Data Deletion Request Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>

                {/* Data Choice */}
                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                    What data would you like to delete? *
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All personal data</option>
                    <option value="profile">Profile information only</option>
                    <option value="communications">Communication history only</option>
                    <option value="forms">Form submissions only</option>
                    <option value="custom">Custom selection (specify below)</option>
                  </select>
                </div>

                {/* Reason */}
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for deletion (Optional)
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a reason (optional)</option>
                    <option value="no-longer-needed">No longer need the service</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="created-by-mistake">Account created by mistake</option>
                    <option value="switching-providers">Switching to another provider</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Extra Information */}
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide any additional details about your deletion request..."
                  />
                </div>

                {/* Terms Agreement */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreement"
                      required
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agreement" className="text-sm text-gray-700">
                      I understand that this action is irreversible and that all my personal data 
                      will be permanently deleted from Uniqwrites Educational Concepts' systems. 
                      I acknowledge that some data may be retained for legal or regulatory compliance purposes.
                    </label>
                  </div>
                </div>

                {/* Send Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    Submit Deletion Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-4">
            If you have questions about data deletion or need assistance with your request, please contact us:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a 
              href="mailto:privacy@uniqwrites.africa" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              privacy@uniqwrites.africa
            </a>
            <a 
              href="tel:+2349164923056" 
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              +234 916 492 3056
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
