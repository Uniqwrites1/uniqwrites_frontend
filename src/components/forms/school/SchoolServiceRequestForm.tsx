import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
  const { register, control, handleSubmit, formState: { errors } } = useForm<SchoolServiceRequestData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data: SchoolServiceRequestData) => {
    console.log('Form Data:', data);

    // Simulate form submission (replace with actual backend call)
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  // Render submission success message
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Thank you for your request!</strong>
          <p className="block sm:inline mt-2">
            Your school service request has been successfully submitted.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
          <div className="space-y-4 text-left max-w-xl mx-auto">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>A Uniqwrites consultant will review your request within 1-2 business days.</p>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p>We will contact you via email or phone to discuss your specific requirements.</p>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <p>We will provide a tailored solution based on your school's unique needs.</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-black text-yellow-400 px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="bg-black text-yellow-400 text-center py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">School Services Request Form</h1>
      </div>

      <aside className="w-full md:w-1/4 bg-gray-100 p-6 border-b md:border-b-0 md:border-r">
        <ul className="space-y-4 text-sm font-medium">
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 1: School Profile</li>
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 2: Service Type</li>
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 3: Teacher Request Details</li>
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 4: ICT/EdTech Services</li>
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 5: Additional Notes</li>
          <li className="bg-yellow-100 text-black border-l-4 border-yellow-400">Step 6: Confirmation</li>
        </ul>
      </aside>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        {/* School Profile Section */}
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
          <div>
            <label className="block mb-2">School Address</label>
            <input
              {...register('schoolAddress', { required: 'School Address is required' })}
              className="w-full p-2 border rounded"
              placeholder="Enter school address"
            />
            {errors.schoolAddress && <p className="text-red-500">{errors.schoolAddress.message}</p>}
    </div>

          <div className="grid grid-cols-2 gap-4">
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
              <label className="block mb-2">LGA</label>
              <input
                {...register('lga', { required: 'LGA is required' })}
                className="w-full p-2 border rounded"
                placeholder="Enter LGA"
              />
              {errors.lga && <p className="text-red-500">{errors.lga.message}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-2">School Email</label>
            <input
              type="email"
              {...register('schoolEmail', {
                required: 'School Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
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

          <div>
            <label className="block mb-2">Contact Phone Number</label>
            <input
              type="tel"
              {...register('contactPhoneNumber', {
                required: 'Contact Phone Number is required',
                pattern: {
                  value: /^[0-9]{10,14}$/,
                  message: "Invalid phone number"
                }
              })}
              className="w-full p-2 border rounded"
              placeholder="Enter phone number"
            />
            {errors.contactPhoneNumber && <p className="text-red-500">{errors.contactPhoneNumber.message}</p>}
          </div>
        </div>

        {/* Service Type Selection */}
        <div className="mt-6">
          <label className="block mb-2 font-bold">Service Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Request for Teachers"
                {...register('serviceType')}
                className="mr-2"
              />
              Request for Teachers
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Digital Transformation & ICT Services"
                {...register('serviceType')}
                className="mr-2"
              />
              Digital Transformation & ICT Services
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="EdTech Tools Consultation"
                {...register('serviceType')}
                className="mr-2"
              />
              EdTech Tools Consultation
            </label>
          </div>
          <input
            {...register('serviceType')}
            className="w-full p-2 border rounded mt-2"
            placeholder="Other (specify)"
          />
        </div>

        {/* Teacher Request Details */}
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">Teacher Request Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Number of Teachers Needed</label>
              <input
                type="number"
                {...register('teacherRequestDetails.numberOfTeachers', { min: 1 })}
                className="w-full p-2 border rounded"
                placeholder="Enter number of teachers"
              />
            </div>
            <div>
              <label className="block mb-2">Subjects/Classes Needed</label>
              <input
                {...register('teacherRequestDetails.subjectsNeeded')}
                className="w-full p-2 border rounded"
                placeholder="Enter subjects or classes"
              />
            </div>
            <div>
              <label className="block mb-2">Duration</label>
              <select
                {...register('teacherRequestDetails.duration')}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Duration</option>
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Preferred Start Date</label>
              <input
                type="date"
                {...register('teacherRequestDetails.preferredStartDate')}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2">Specific Requirements</label>
            <div className="grid md:grid-cols-3 gap-2">
              {['Certifications', 'Gender', 'Experience'].map((req) => (
                <label key={req} className="flex items-center">
                  <input
                    type="checkbox"
                    value={req}
                    {...register('teacherRequestDetails.specificRequirements')}
                    className="mr-2"
                  />
                  {req}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* EdTech Service Details */}
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-semibold mb-4">ICT/EdTech Services</h3>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-black">Areas of Interest</label>
            <div className="grid md:grid-cols-3 gap-2">
              {['School Management Systems', 'Teacher Training', 'Infrastructure Setup'].map((area) => (
                <label key={area} className="flex items-center">
                  <input
                    type="checkbox"
                    value={area}
                    {...register('edTechServiceDetails.areasOfInterest')}
                    className="mr-2 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  {area}
                </label>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold text-black">Preferred Mode</label>
              <select
                {...register('edTechServiceDetails.preferredMode')}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select Mode</option>
                <option value="Physical Visit">Physical Visit</option>
                <option value="Virtual Consultation">Virtual Consultation</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-bold text-black">Budget Range (Optional)</label>
              <input
                {...register('edTechServiceDetails.budgetRange')}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter budget range"
              />
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="mt-6">
          <label className="block mb-2">Additional Notes or Needs</label>
          <textarea
            {...register('additionalNotes')}
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Enter any additional information"
          />
        </div>

        {/* Confirmation Checkbox */}
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('agreementConfirmed', { required: 'You must agree to be contacted' })}
              className="mr-2"
            />
            I agree that a Uniqwrites consultant will reach out for follow-up and contract discussion.
          </label>
          {errors.agreementConfirmed && <p className="text-red-500">{errors.agreementConfirmed.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-black text-yellow-400 px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchoolServiceRequestForm;

