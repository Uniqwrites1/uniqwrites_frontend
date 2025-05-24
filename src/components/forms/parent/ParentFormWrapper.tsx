import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StepParentInfo from './StepParentInfo';
import StepStudentInfo from './StepStudentInfo';
import StepTutoringRequirements from './StepTutoringRequirements';
import StepTutorPreference from './StepTutorPreference';
import { emailService } from '../../../services/emailService';

const steps = [
  { id: 1, title: 'Parent Info' },
  { id: 2, title: 'Student Info' },
  { id: 3, title: 'Tutoring Requirements' },
  { id: 4, title: 'Tutor Preferences' }
];

interface FormData {
  // Parent Info
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  stateOfResidence: string;
  relationshipToStudent: string;

  // Student Info
  students: Array<{
    name: string;
    age: number;
    currentClass: string;
    peculiarity: string;
  }>;

  // Tutoring Requirements
  servicesType: {
    homeschool: boolean;
    homeTutoring: boolean;
    examPrep: boolean;
    assignment: boolean;
  };
  subjectsRequested: string;
  preferredMode: string;
  preferredDays: {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
  };
  durationPerLesson: string;
  preferredLessonTime: string;
  startDate: string;

  // Tutor Preferences
  preferredGender: string;
  languagePreference: string;
  qualificationsPriority: string;
}

export default function ParentFormWrapper() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Parent Info
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    residentialAddress: '',
    stateOfResidence: '',
    relationshipToStudent: '',

    // Student Info
    students: [{ name: '', age: 0, currentClass: '', peculiarity: '' }],

    // Tutoring Requirements
    servicesType: {
      homeschool: false,
      homeTutoring: false,
      examPrep: false,
      assignment: false
    },
    subjectsRequested: '',
    preferredMode: '',
    preferredDays: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    },
    durationPerLesson: '',
    preferredLessonTime: '',
    startDate: '',

    // Tutor Preferences
    preferredGender: '',
    languagePreference: '',
    qualificationsPriority: ''  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateFormData = (field: string, value: unknown) => {
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
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Send form submission via email service
      const emailSuccess = await emailService.sendFormSubmission({
        formType: 'parent',
        submitterName: formData.fullName,
        submitterEmail: formData.emailAddress,
        formData: {
          parentInfo: {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            emailAddress: formData.emailAddress,
            residentialAddress: formData.residentialAddress,
            stateOfResidence: formData.stateOfResidence,
            relationshipToStudent: formData.relationshipToStudent
          },
          students: formData.students,
          tutoringRequirements: {
            servicesType: formData.servicesType,
            subjectsRequested: formData.subjectsRequested,
            preferredMode: formData.preferredMode,
            preferredDays: formData.preferredDays,
            durationPerLesson: formData.durationPerLesson,
            preferredLessonTime: formData.preferredLessonTime,
            startDate: formData.startDate
          },
          tutorPreferences: {
            preferredGender: formData.preferredGender,
            languagePreference: formData.languagePreference,
            qualificationsPriority: formData.qualificationsPriority
          }
        }
      });

      if (emailSuccess) {
        toast.success('Your tutoring request has been submitted successfully!');
        // Redirect to thank you page with form type
        navigate('/thank-you', { 
          state: { 
            formType: 'parent',
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
  };
  return (
    <div className="min-h-screen bg-[#F8F8F8] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="bg-black text-[#FFC107] text-center py-6 rounded-t-xl">
          <h1 className="text-3xl font-bold">Parent Tutoring Request</h1>
          <p className="mt-2 text-white opacity-90">Get matched with the perfect tutor for your child</p>
        </div>
        
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC107] mx-auto mb-4"></div>
              <p className="text-gray-700">Submitting your request...</p>
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="mb-8">
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
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            {currentStep === 1 && (
              <StepParentInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <StepStudentInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 3 && (
              <StepTutoringRequirements
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            {currentStep === 4 && (
              <StepTutorPreference
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleSubmit}
                onPrevious={handlePrevious}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
