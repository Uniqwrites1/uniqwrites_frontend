import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

interface SponsorFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  organization?: string;
  initiative: 'Literacy Immersion' | 'Back to School';
  sponsorshipType: 'One-Time' | 'Monthly' | 'Annual';
  amount: number;
  preferredContact: 'Email' | 'Phone' | 'WhatsApp';
  message?: string;
}

const SponsorForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLiteracy = location.pathname.includes('literacy');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SponsorFormData>({
    defaultValues: {
      initiative: isLiteracy ? 'Literacy Immersion' : 'Back to School'
    }
  });

  const onSubmit = async (data: SponsorFormData) => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/initiatives/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Submission failed');
      
      // Redirect to success page or show success message
      navigate('/initiatives/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          Become a Sponsor
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              {...register('phoneNumber', { required: 'Phone number is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Organization (Optional)</label>
            <input
              type="text"
              {...register('organization')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initiative to Support</label>
            <select
              {...register('initiative', { required: 'Please select an initiative' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="Literacy Immersion">Literacy Immersion</option>
              <option value="Back to School">Back to School</option>
            </select>
            {errors.initiative && (
              <p className="mt-1 text-sm text-red-600">{errors.initiative.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sponsorship Type</label>
            <select
              {...register('sponsorshipType', { required: 'Please select a sponsorship type' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="One-Time">One-Time</option>
              <option value="Monthly">Monthly</option>
              <option value="Annual">Annual</option>
            </select>
            {errors.sponsorshipType && (
              <p className="mt-1 text-sm text-red-600">{errors.sponsorshipType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amount Willing to Support</label>
            <input
              type="number"
              {...register('amount', { 
                required: 'Please enter an amount',
                min: { value: 1, message: 'Amount must be greater than 0' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
            <select
              {...register('preferredContact', { required: 'Please select a contact method' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="WhatsApp">WhatsApp</option>
            </select>
            {errors.preferredContact && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredContact.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
            <textarea
              {...register('message')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SponsorForm;
