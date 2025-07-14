import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { emailService } from '../../../services/emailService';
import StepStudentPersonalInfo from './StepStudentPersonalInfo';
import StepStudentAcademicInfo from './StepStudentAcademicInfo';
import StepStudentTutoringRequirements from './StepStudentTutoringRequirements';
import StepStudentTutorPreferences from './StepStudentTutorPreferences';

interface FormData {
  // Personal Info
  fullName: string;
  age: number;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  stateOfResidence: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  
  // Academic Info
  currentClass: string;
  currentSchool: string;
  previousGrades: string;
  academicChallenges: string;
  learningGoals: string;
  
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
  
  // Special considerations
  specialNeeds: string;
}

export default function StudentFormWrapper() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: '',
    age: 0,
    phoneNumber: '',
    emailAddress: '',
    residentialAddress: '',
    stateOfResidence: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    
    // Academic Info
    currentClass: '',
    currentSchool: '',
    previousGrades: '',
    academicChallenges: '',
    learningGoals: '',
    
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
    qualificationsPriority: '',
    
    // Special considerations
    specialNeeds: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const previousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const emailSuccess = await emailService.sendFormSubmission({
        formType: 'student',
        submitterName: formData.fullName,
        submitterEmail: formData.emailAddress,
        formData: {
          personalInfo: {
            fullName: formData.fullName,
            age: formData.age,
            phoneNumber: formData.phoneNumber,
            emailAddress: formData.emailAddress,
            residentialAddress: formData.residentialAddress,
            stateOfResidence: formData.stateOfResidence,
            emergencyContact: formData.emergencyContact,
            emergencyContactPhone: formData.emergencyContactPhone
          },
          academicInfo: {
            currentClass: formData.currentClass,
            currentSchool: formData.currentSchool,
            previousGrades: formData.previousGrades,
            academicChallenges: formData.academicChallenges,
            learningGoals: formData.learningGoals
          },
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
          },
          specialNeeds: formData.specialNeeds
        }
      });

      if (emailSuccess) {
        toast.success('Your enrollment request has been submitted successfully!');
        // Redirect to thank you page with form type
        navigate('/thank-you', { 
          state: { 
            formType: 'student',
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepStudentPersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepStudentAcademicInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 3:
        return (
          <StepStudentTutoringRequirements
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrevious={previousStep}
          />
        );
      case 4:
        return (
          <StepStudentTutorPreferences
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleSubmit}
            onPrevious={previousStep}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    'Personal Information',
    'Academic Background',
    'Tutoring Requirements',
    'Tutor Preferences'
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
        <div className="bg-black text-[#FFC107] text-center py-6 rounded-t-xl">
          <h1 className="text-3xl font-bold">Student Enrollment</h1>
          <p className="mt-2 text-white opacity-90">Get matched with the perfect tutor for your learning journey</p>
        </div>
        
        {/* Loading Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg flex flex-col items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FFC107] mb-4"></div>
              <p className="text-xl font-semibold text-black">Submitting your enrollment...</p>
            </div>
          </div>
        )}
        
        {/* Progress Indicator */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                  ${currentStep > index + 1 ? 'bg-green-500 text-white' :
                    currentStep === index + 1 ? 'bg-[#FFC107] text-black' :
                    'bg-gray-300 text-gray-600'
                  }
                `}>
                  {currentStep > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep === index + 1 ? 'text-[#FFC107]' : 'text-gray-500'
                }`}>
                  {title}
                </span>
                {index < stepTitles.length - 1 && (
                  <div className={`ml-4 w-12 h-0.5 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Form Content */}
        <div className="p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
