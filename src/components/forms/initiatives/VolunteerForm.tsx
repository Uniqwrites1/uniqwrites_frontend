import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

interface VolunteerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  preferredRole: 'Literacy Teaching' | 'Mentorship' | 'Field Outreach' | 'Admin Support';
  initiative: 'Literacy Immersion' | 'Back to School';
  availability: string;
  motivation?: string;
}

const VolunteerForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLiteracy = location.pathname.includes('literacy');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<VolunteerFormData>({
    defaultValues: {
      initiative: isLiteracy ? 'Literacy Immersion' : 'Back to School'
    }
  });

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/initiatives/volunteer', {
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
          Join as a Volunteer
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
            <label className="block text-sm font-medium text-gray-700">Location (City, State)</label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Volunteer Role</label>
            <select
              {...register('preferredRole', { required: 'Please select a preferred role' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            >
              <option value="Literacy Teaching">Literacy Teaching</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Field Outreach">Field Outreach</option>
              <option value="Admin Support">Admin Support</option>
            </select>
            {errors.preferredRole && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredRole.message}</p>
            )}
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
            <label className="block text-sm font-medium text-gray-700">Availability (Days/Times)</label>
            <textarea
              {...register('availability', { required: 'Please specify your availability' })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="E.g., Available weekends and weekday evenings"
            />
            {errors.availability && (
              <p className="mt-1 text-sm text-red-600">{errors.availability.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Why do you want to volunteer? (Optional)</label>
            <textarea
              {...register('motivation')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Share your motivation for volunteering..."
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

export default VolunteerForm;
