import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { emailService } from "../services/emailService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    try {
      const success = await emailService.sendFormSubmission({
        formType: 'initiative',
        submitterName: data.name,
        submitterEmail: data.email,
        formData: {
          subject: data.subject,
          message: data.message,
          interest: data.subject,
        }
      });

      if (success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        navigate('/thank-you?type=contact');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of
            the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+234 706 663 3734</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">uniqwrites1@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">
                      Gold Court Estate,Jahi, Abuja, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageSquare className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-gray-600">+234 916 492 3056</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full px-6 py-3 rounded-md font-medium transition-colors ${
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-primary text-secondary hover:bg-primary-dark'
                  }`}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
