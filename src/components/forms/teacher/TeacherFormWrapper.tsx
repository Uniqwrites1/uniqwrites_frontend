import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StepPersonalDetails from './StepPersonalDetails';
import StepAcademicInfo from './StepAcademicInfo';
import StepServicePreferences from './StepServicePreferences';
import StepUploads from './StepUploads';
import { emailService } from '../../../services/emailService';

const steps = [
  { id: 1, title: 'Personal Details' },
  { id: 2, title: 'Academic Info' },
  { id: 3, title: 'Service Preferences' },
  { id: 4, title: 'Documents Upload' }
];

interface FormData {
  // Personal Details
  fullName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  state: string;
  
  // Academic Info
  highestQualification: string;
  teachingCertifications: string[];
  subjectsOfExpertise: string[];
  yearsOfExperience: string;
  preferredStudentLevels: string[];
  
  // Service Preferences
  availableMode: string[];
  preferredOpportunities: string[];
  
  // Uploads
  cv: File | null;
  photo: File | null;
  certificates: File[];
  
  // Index signature to allow additional properties
  [key: string]: unknown;
}

export default function TeacherFormWrapper() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Personal Details
    fullName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    state: '',
    
    // Academic Info
    highestQualification: '',
    teachingCertifications: [],
    subjectsOfExpertise: [],
    yearsOfExperience: '',
    preferredStudentLevels: [],
    
    // Service Preferences
    availableMode: [],
    preferredOpportunities: [],
    
    // Uploads
    cv: null,
    photo: null,
    certificates: []
  });  const updateFormData = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send form submission via email service
      const emailSuccess = await emailService.sendFormSubmission({
        formType: 'teacher',
        submitterName: formData.fullName,
        submitterEmail: formData.email,
        formData: {
          personalDetails: {
            fullName: formData.fullName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            address: formData.address,
            state: formData.state
          },
          academicInfo: {
            highestQualification: formData.highestQualification,
            teachingCertifications: formData.teachingCertifications,
            subjectsOfExpertise: formData.subjectsOfExpertise,
            yearsOfExperience: formData.yearsOfExperience,
            preferredStudentLevels: formData.preferredStudentLevels
          },
          servicePreferences: {
            availableMode: formData.availableMode,
            preferredOpportunities: formData.preferredOpportunities
          },
          uploads: {
            cv: formData.cv?.name || 'No CV uploaded',
            photo: formData.photo?.name || 'No photo uploaded',
            certificates: formData.certificates.map(cert => cert.name).join(', ') || 'No certificates uploaded'
          }
        }
      });

      if (emailSuccess) {
        toast.success('Your teacher application has been submitted successfully!');
        // Redirect to thank you page with form type
        navigate('/thank-you', { 
          state: { 
            formType: 'teacher',
            submitterName: formData.fullName
          } 
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };  return (
    <div className="min-h-screen bg-[#F8F8F8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-black text-[#FFC107] text-center py-8 px-6">
          <h1 className="text-3xl font-bold">Teacher Registration</h1>
          <p className="mt-2 text-white opacity-90">Join our community of educators</p>
        </div>
        
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC107] mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Submitting your application...</p>
            </div>
          </div>
        )}
          {/* Progress Bar */}
        <div className="px-8 py-6 bg-gray-50 border-b">
          <div className="flex justify-between relative">
            {/* Progress line */}
            <div className="absolute top-4 left-0 h-0.5 bg-gray-200 w-full -z-10"></div>
            <div 
              className="absolute top-4 left-0 h-0.5 bg-[#FFC107] transition-all duration-300" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map(step => (
              <div 
                key={step.id}
                className={`flex-1 text-center ${
                  step.id === currentStep 
                    ? 'text-[#FFC107] font-bold' 
                    : step.id < currentStep 
                    ? 'text-black' 
                    : 'text-gray-400'
                }`}
              >
                <div className="relative">
                  <div 
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step.id === currentStep 
                        ? 'border-[#FFC107] bg-[#FFC107] text-white' 
                        : step.id < currentStep 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="mt-2">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="px-8 py-8">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <StepPersonalDetails
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                />
              )}
              {currentStep === 2 && (
                <StepAcademicInfo
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}
              {currentStep === 3 && (
                <StepServicePreferences
                  formData={formData}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              )}            {currentStep === 4 && (
                <StepUploads
                  onSubmit={handleSubmit}
                  onPrevious={handlePrevious}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
