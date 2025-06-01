import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../../../services/emailService';
import { EmailInput } from '../../common/EmailInput';

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
  const [emailValidationState, setEmailValidationState] = useState({ isValid: true, isDuplicate: false });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<SponsorFormData>({
    defaultValues: {
      initiative: isLiteracy ? 'Literacy Immersion' : 'Back to School'
    }
  });

  const watchedEmail = watch("email");

  const handleEmailValidation = (isValid: boolean, isDuplicate: boolean) => {
    setEmailValidationState({ isValid, isDuplicate });
  };  const onSubmit = async (data: SponsorFormData) => {
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
          type: 'sponsor',
          initiative: data.initiative,
          contactInfo: {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            organization: data.organization,
            preferredContact: data.preferredContact
          },
          sponsorshipDetails: {
            sponsorshipType: data.sponsorshipType,
            amount: data.amount,
            message: data.message
          }
        }
      });

      if (emailSuccess) {
        toast.success('Your sponsorship interest has been submitted successfully!');
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

export default SponsorForm;
