import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../../../services/emailService';
import { EmailInput } from '../../common/EmailInput';

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
  const [emailValidationState, setEmailValidationState] = useState({ isValid: true, isDuplicate: false });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<VolunteerFormData>({
    defaultValues: {
      initiative: isLiteracy ? 'Literacy Immersion' : 'Back to School'
    }
  });

  const watchedEmail = watch("email");

  const handleEmailValidation = (isValid: boolean, isDuplicate: boolean) => {
    setEmailValidationState({ isValid, isDuplicate });
  };  const onSubmit = async (data: VolunteerFormData) => {
    // Check email validation before proceeding
    if (!emailValidationState.isValid || emailValidationState.isDuplicate) {
      toast.error('Please fix email validation issues before submitting.');
      return;
    }

    try {
      // Send form submission via email service
      const emailSuccess = await emailService.sendFormSubmission({
        formType: 'initiative',
        submitterName: data.fullName,
        submitterEmail: data.email,
        formData: {
          type: 'volunteer',
          initiative: data.initiative,
          contactInfo: {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            location: data.location
          },
          volunteerDetails: {
            preferredRole: data.preferredRole,
            availability: data.availability,
            motivation: data.motivation
          }
        }
      });

      if (emailSuccess) {
        toast.success('Your volunteer application has been submitted successfully!');
        // Redirect to thank you page with form type
        navigate('/thank-you', { 
          state: { 
            formType: 'initiative',
            submitterName: data.fullName
          } 
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit form. Please try again.');
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
          </div>          <div>
            <EmailInput
              value={watchedEmail || ""}
              onChange={(value) => setValue("email", value)}
              onValidationChange={handleEmailValidation}
              formType="initiative"
              id="email"
              name="email"
              required
              error={errors.email?.message}
              label="Email Address"
            />
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
          </div>          <div>
            <button
              type="submit"
              disabled={isSubmitting || !emailValidationState.isValid || emailValidationState.isDuplicate}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting || !emailValidationState.isValid || emailValidationState.isDuplicate
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-500'
              }`}
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
