import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  currentClass: yup.string().required("Current class is required"),
  currentSchool: yup.string().required("Current school is required"),
  previousGrades: yup.string().required("Previous grades information is required"),
  academicChallenges: yup.string().optional(),
  learningGoals: yup.string().required("Learning goals are required")
});

interface StepStudentAcademicInfoProps {
  formData: {
    currentClass: string;
    currentSchool: string;
    previousGrades: string;
    academicChallenges: string;
    learningGoals: string;
  };
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepStudentAcademicInfo: React.FC<StepStudentAcademicInfoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const handleFormSubmit = (data: any) => {
    Object.entries(data).forEach(([key, value]) => {
      updateFormData(key, value);
    });
    onNext();
  };

  const classOptions = [
    "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6",
    "JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3",
    "ND 1", "ND 2", "HND 1", "HND 2",
    "100 Level", "200 Level", "300 Level", "400 Level", "500 Level", "600 Level",
    "Other"
  ];

  const gradeOptions = [
    "Excellent (A1-A3)", "Good (B2-B3)", "Credit (C4-C6)", 
    "Pass (D7-E8)", "Struggling (F9)", "Mixed Performance", "Not Applicable"
  ];

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="currentClass">
            Current Class/Level
          </label>
          <select
            id="currentClass"
            {...register("currentClass")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select your current class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {errors.currentClass && (
            <p className="mt-1 text-sm text-red-600">{errors.currentClass.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="currentSchool">
            Current School/Institution
          </label>
          <input
            type="text"
            id="currentSchool"
            {...register("currentSchool")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your current school name"
          />
          {errors.currentSchool && (
            <p className="mt-1 text-sm text-red-600">{errors.currentSchool.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="previousGrades">
          Previous Academic Performance
        </label>
        <select
          id="previousGrades"
          {...register("previousGrades")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your general performance</option>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.previousGrades && (
          <p className="mt-1 text-sm text-red-600">{errors.previousGrades.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          This helps us understand your current academic standing.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="academicChallenges">
          Academic Challenges (Optional)
        </label>
        <textarea
          id="academicChallenges"
          {...register("academicChallenges")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="What subjects or areas do you find challenging? Any learning difficulties?"
          rows={4}
        />
        <p className="mt-1 text-sm text-gray-500">
          This information helps us match you with the right tutor and teaching approach.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="learningGoals">
          Learning Goals & Aspirations
        </label>
        <textarea
          id="learningGoals"
          {...register("learningGoals")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="What do you hope to achieve? Any specific exams to prepare for? Career goals?"
          rows={4}
        />
        {errors.learningGoals && (
          <p className="mt-1 text-sm text-red-600">{errors.learningGoals.message}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Share your academic goals, exam preparations (WAEC, JAMB, etc.), or career aspirations.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-black mb-2">Why We Ask These Questions</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Current Class:</strong> Helps us match you with tutors experienced in your level</li>
          <li>• <strong>Academic Performance:</strong> Allows us to understand your current standing</li>
          <li>• <strong>Challenges:</strong> Ensures we find tutors who can address your specific needs</li>
          <li>• <strong>Goals:</strong> Helps us align tutoring with your aspirations</li>
        </ul>
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
          className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 transition-all duration-200 font-semibold"
        >
          Next Step
        </button>
      </div>
    </motion.form>
  );
};

export default StepStudentAcademicInfo;
