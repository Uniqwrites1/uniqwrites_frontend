import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  preferredGender: yup.string().required("Please select preferred gender"),
  languagePreference: yup.string().required("Please specify language preference"),
  qualificationsPriority: yup.string().optional(),
  specialNeeds: yup.string().optional()
});

interface StepStudentTutorPreferencesProps {
  formData: {
    preferredGender: string;
    languagePreference: string;
    qualificationsPriority: string;
    specialNeeds: string;
  };
  updateFormData: (field: string, value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepStudentTutorPreferences: React.FC<StepStudentTutorPreferencesProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit((data) => {
        // Update form data
        Object.entries(data).forEach(([key, value]) => {
          updateFormData(key, value);
        });
        // Call onNext which will trigger form submission and navigation
        onNext();
      })} className="space-y-8">
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-black mb-2">🎯 Almost Done!</h3>
          <p className="text-gray-700">
            Help us find the perfect tutor match by sharing your preferences. These details ensure 
            you get the most suitable tutor for your learning style and needs.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Preferred Tutor Gender
          </label>
          <select
            {...register("preferredGender")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select preferred gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">No Preference</option>
          </select>
          {errors.preferredGender && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredGender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Language Preference
          </label>
          <input
            type="text"
            {...register("languagePreference")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="e.g., English, Yoruba, Hausa, French"
          />
          {errors.languagePreference && (
            <p className="mt-1 text-sm text-red-600">{errors.languagePreference.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Which language(s) would you prefer your tutor to communicate in?
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Qualification Priority (Optional)
          </label>
          <select
            {...register("qualificationsPriority")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select qualification priority</option>
            <option value="phd">PhD Holder</option>
            <option value="masters">Masters Degree</option>
            <option value="bachelors">Bachelors Degree</option>
            <option value="teachingCert">Teaching Certification</option>
            <option value="experience">Experience Over Qualifications</option>
          </select>
          {errors.qualificationsPriority && (
            <p className="mt-1 text-sm text-red-600">{errors.qualificationsPriority.message}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            This helps us match you with tutors that best meet your qualification preferences.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Special Needs or Learning Preferences (Optional)
          </label>
          <textarea
            {...register("specialNeeds")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Please share any learning disabilities, special accommodations needed, preferred teaching style, or any other information that would help us find the right tutor for you."
            rows={5}
          />
          <p className="mt-2 text-sm text-gray-500">
            This information is confidential and helps us match you with tutors who can best support your learning needs.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-black mb-3">🔒 Your Privacy Matters</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• All your information is kept strictly confidential</li>
            <li>• We only share relevant details with your assigned tutor</li>
            <li>• You can update your preferences anytime</li>
            <li>• We match you based on compatibility and expertise</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-black mb-3">🎉 What Happens Next?</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5">1</span>
              <span>We'll review your application within 24 hours</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5">2</span>
              <span>Our team will match you with suitable tutors</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5">3</span>
              <span>You'll receive a call to discuss your matched tutor</span>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full mr-3 mt-0.5">4</span>
              <span>Schedule your first tutoring session</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 font-semibold"
          >
            Previous Step
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 transition-all duration-200 font-semibold text-lg"
          >
            Submit Enrollment
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StepStudentTutorPreferences;
