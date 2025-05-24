import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../../../services/emailService';

interface SchoolServiceRequestData {
  schoolName: string;
  schoolType: string[];
  schoolAddress: string;
  state: string;
  lga: string;
  schoolEmail: string;
  contactPersonName: string;
  contactPhoneNumber: string;
  serviceType: string[];
  teacherRequestDetails?: {
    numberOfTeachers: number;
    subjectsNeeded: string;
    duration: string;
    preferredStartDate: string;
    specificRequirements: string[];
  };
  edTechServiceDetails?: {
    areasOfInterest: string[];
    preferredMode: string;
    budgetRange?: string;
  };
  additionalNotes: string;
  agreementConfirmed: boolean;
}

const SchoolServiceRequestForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SchoolServiceRequestData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = async (data: SchoolServiceRequestData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // Send form submission via email service
      const emailSuccess = await emailService.sendFormSubmission({
        formType: 'school',
        submitterName: data.contactPersonName || data.schoolName,
        submitterEmail: data.schoolEmail,
        formData: {
          schoolInfo: {
            schoolName: data.schoolName,
            schoolType: data.schoolType,
            schoolAddress: data.schoolAddress,
            state: data.state,
            lga: data.lga,
            schoolEmail: data.schoolEmail
          },
          contactInfo: {
            contactPersonName: data.contactPersonName,
            contactPhoneNumber: data.contactPhoneNumber
          },
          serviceDetails: {
            serviceType: data.serviceType,
            teacherRequestDetails: data.teacherRequestDetails,
            edTechServiceDetails: data.edTechServiceDetails,
            additionalNotes: data.additionalNotes
          },
          agreementConfirmed: data.agreementConfirmed
        }
      });

      if (emailSuccess) {
        toast.success('Your school service request has been submitted successfully!');
        // Redirect to thank you page with form type
        navigate('/thank-you', { 
          state: { 
            formType: 'school',
            submitterName: data.contactPersonName || data.schoolName
          } 
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="bg-black text-yellow-400 text-center py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">School Services Request Form</h1>
      </div>
      
      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-6 mt-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 bg-gray-100 p-6 border-b md:border-b-0 md:border-r">
          <ul className="space-y-4 text-sm font-medium">
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 1: School Profile</li>
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 2: Service Type</li>
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 3: Teacher Request Details</li>
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 4: ICT/EdTech Services</li>
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 5: Additional Notes</li>
            <li className="bg-yellow-100 text-black border-l-4 border-yellow-400 p-2">Step 6: Confirmation</li>
          </ul>
        </aside>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 flex-1">
          {/* School Profile Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">School Profile</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">School Name</label>
                <input
                  {...register('schoolName', { required: 'School Name is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter school name"
                />
                {errors.schoolName && <p className="text-red-500">{errors.schoolName.message}</p>}
              </div>

              <div>
                <label className="block mb-2">School Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Primary"
                      {...register('schoolType')}
                      className="mr-2"
                    />
                    Primary
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Secondary"
                      {...register('schoolType')}
                      className="mr-2"
                    />
                    Secondary
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value="Both"
                      {...register('schoolType')}
                      className="mr-2"
                    />
                    Both
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2">School Address</label>
              <textarea
                {...register('schoolAddress', { required: 'School Address is required' })}
                className="w-full p-2 border rounded"
                placeholder="Enter full school address"
                rows={3}
              />
              {errors.schoolAddress && <p className="text-red-500">{errors.schoolAddress.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">State</label>
                <input
                  {...register('state', { required: 'State is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter state"
                />
                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
              </div>

              <div>
                <label className="block mb-2">Local Government Area (LGA)</label>
                <input
                  {...register('lga', { required: 'LGA is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter LGA"
                />
                {errors.lga && <p className="text-red-500">{errors.lga.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">School Email</label>
                <input
                  type="email"
                  {...register('schoolEmail', { required: 'School Email is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter school email"
                />
                {errors.schoolEmail && <p className="text-red-500">{errors.schoolEmail.message}</p>}
              </div>

              <div>
                <label className="block mb-2">Contact Person Name</label>
                <input
                  {...register('contactPersonName', { required: 'Contact Person Name is required' })}
                  className="w-full p-2 border rounded"
                  placeholder="Enter contact person name"
                />
                {errors.contactPersonName && <p className="text-red-500">{errors.contactPersonName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2">Contact Phone Number</label>
              <input
                {...register('contactPhoneNumber', { required: 'Contact Phone Number is required' })}
                className="w-full p-2 border rounded"
                placeholder="Enter contact phone number"
              />
              {errors.contactPhoneNumber && <p className="text-red-500">{errors.contactPhoneNumber.message}</p>}
            </div>
          </div>

          {/* Service Type Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Service Type</h2>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Teacher Placement"
                  {...register('serviceType')}
                  className="mr-2"
                />
                Teacher Placement Services
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="ICT/EdTech Services"
                  {...register('serviceType')}
                  className="mr-2"
                />
                ICT/EdTech Training & Consultation
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Educational Consultation"
                  {...register('serviceType')}
                  className="mr-2"
                />
                General Educational Consultation
              </label>
            </div>
          </div>

          {/* Teacher Request Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Teacher Request Details (if applicable)</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Number of Teachers Needed</label>
                <input
                  type="number"
                  {...register('teacherRequestDetails.numberOfTeachers')}
                  className="w-full p-2 border rounded"
                  placeholder="Enter number"
                />
              </div>

              <div>
                <label className="block mb-2">Duration</label>
                <select
                  {...register('teacherRequestDetails.duration')}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select duration</option>
                  <option value="1 term">1 Term</option>
                  <option value="1 academic year">1 Academic Year</option>
                  <option value="2+ years">2+ Years</option>
                  <option value="Permanent">Permanent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2">Subjects/Areas Needed</label>
              <textarea
                {...register('teacherRequestDetails.subjectsNeeded')}
                className="w-full p-2 border rounded"
                placeholder="Specify subjects or teaching areas needed"
                rows={3}
              />
            </div>

            <div>
              <label className="block mb-2">Preferred Start Date</label>
              <input
                type="date"
                {...register('teacherRequestDetails.preferredStartDate')}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Specific Requirements</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Experience with specific curriculum"
                    {...register('teacherRequestDetails.specificRequirements')}
                    className="mr-2"
                  />
                  Experience with specific curriculum
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Technology integration skills"
                    {...register('teacherRequestDetails.specificRequirements')}
                    className="mr-2"
                  />
                  Technology integration skills
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Special needs experience"
                    {...register('teacherRequestDetails.specificRequirements')}
                    className="mr-2"
                  />
                  Special needs experience
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Multilingual capabilities"
                    {...register('teacherRequestDetails.specificRequirements')}
                    className="mr-2"
                  />
                  Multilingual capabilities
                </label>
              </div>
            </div>
          </div>

          {/* EdTech Services Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">ICT/EdTech Services (if applicable)</h2>
            
            <div>
              <label className="block mb-2">Areas of Interest</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Digital literacy training"
                    {...register('edTechServiceDetails.areasOfInterest')}
                    className="mr-2"
                  />
                  Digital literacy training for teachers
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Learning management systems"
                    {...register('edTechServiceDetails.areasOfInterest')}
                    className="mr-2"
                  />
                  Learning management systems setup
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Educational technology consultation"
                    {...register('edTechServiceDetails.areasOfInterest')}
                    className="mr-2"
                  />
                  Educational technology consultation
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Computer lab setup"
                    {...register('edTechServiceDetails.areasOfInterest')}
                    className="mr-2"
                  />
                  Computer lab setup and management
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2">Preferred Training Mode</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="On-site"
                    {...register('edTechServiceDetails.preferredMode')}
                    className="mr-2"
                  />
                  On-site training
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Virtual"
                    {...register('edTechServiceDetails.preferredMode')}
                    className="mr-2"
                  />
                  Virtual training
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Hybrid"
                    {...register('edTechServiceDetails.preferredMode')}
                    className="mr-2"
                  />
                  Hybrid approach
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2">Budget Range (Optional)</label>
              <select
                {...register('edTechServiceDetails.budgetRange')}
                className="w-full p-2 border rounded"
              >
                <option value="">Select budget range</option>
                <option value="Under ₦100,000">Under ₦100,000</option>
                <option value="₦100,000 - ₦500,000">₦100,000 - ₦500,000</option>
                <option value="₦500,000 - ₦1,000,000">₦500,000 - ₦1,000,000</option>
                <option value="Over ₦1,000,000">Over ₦1,000,000</option>
              </select>
            </div>
          </div>

          {/* Additional Notes Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Additional Notes</h2>
            <textarea
              {...register('additionalNotes')}
              className="w-full p-2 border rounded"
              placeholder="Any additional information or specific requirements..."
              rows={4}
            />
          </div>

          {/* Agreement Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Confirmation</h2>
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('agreementConfirmed', { required: 'You must agree to the terms' })}
                className="mr-2 mt-1"
              />
              <span className="text-sm">
                I confirm that the information provided is accurate and I agree to Uniqwrites' terms of service. 
                I understand that a consultation will be scheduled to discuss my school's specific needs.
              </span>
            </label>
            {errors.agreementConfirmed && <p className="text-red-500">{errors.agreementConfirmed.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-yellow-400 px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolServiceRequestForm;

