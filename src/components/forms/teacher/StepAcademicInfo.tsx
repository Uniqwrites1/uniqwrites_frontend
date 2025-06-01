import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  highestQualification: yup.string().required("Highest qualification is required"),
  teachingCertifications: yup.array().min(1, "At least one certification is required"),
  subjectsOfExpertise: yup.string().required("Please enter your subjects of expertise"),
  yearsOfExperience: yup
    .number()
    .required("Years of experience is required")
    .min(0, "Experience cannot be negative")
    .max(50, "Please enter a valid years of experience"),
  preferredStudentLevels: yup.array().min(1, "Select at least one student level"),
});

interface StepAcademicInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepAcademicInfo: React.FC<StepAcademicInfoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [showOtherCertification, setShowOtherCertification] = useState(false);
  const [otherCertificationDetail, setOtherCertificationDetail] = useState(formData.otherCertificationDetail || "");
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  // Watch for "Other" certification selection
  const watchedCertifications = watch("teachingCertifications");
  
  React.useEffect(() => {
    if (watchedCertifications && watchedCertifications.includes("Other")) {
      setShowOtherCertification(true);
    } else {
      setShowOtherCertification(false);
      setOtherCertificationDetail("");
    }
  }, [watchedCertifications]);
  return (
    <motion.form
      onSubmit={handleSubmit((data) => {
        Object.entries(data).forEach(([key, value]) => {
          updateFormData(key, value);
        });
        onNext();
      })}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="highestQualification">
            Highest Qualification
          </label>
          <select
            id="highestQualification"
            {...register("highestQualification")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select qualification</option>
            <option value="NCE">NCE</option>
            <option value="Bachelor">Bachelor's Degree</option>
            <option value="Masters">Master's Degree</option>
            <option value="PhD">PhD</option>
            <option value="Others">Others</option>
          </select>
          {errors.highestQualification && (
            <p className="mt-1 text-sm text-red-600">{errors.highestQualification.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Teaching Certification(s)
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="TRCN"
                {...register("teachingCertifications")}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">TRCN</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="PGDE"
                {...register("teachingCertifications")}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">PGDE</span>
            </label>            <label className="flex items-center">
              <input
                type="checkbox"
                value="Other"
                {...register("teachingCertifications")}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">Other</span>
            </label>
            
            {/* Conditional "Other" Detail Field */}
            {watchedCertifications && watchedCertifications.includes("Other") && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-black mb-2">
                  Please specify other certification
                </label>
                <input
                  type="text"
                  placeholder="Enter certification details"
                  value={otherCertificationDetail}
                  onChange={(e) => {
                    setOtherCertificationDetail(e.target.value);
                    updateFormData("otherCertificationDetail", e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
                />
              </div>
            )}
          </div>
          {errors.teachingCertifications && (
            <p className="mt-1 text-sm text-red-600">{errors.teachingCertifications.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="subjectsOfExpertise">
            Subjects of Expertise
          </label>
          <input
            type="text"
            id="subjectsOfExpertise"
            {...register("subjectsOfExpertise")}
            placeholder="Enter subjects (comma separated)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          />
          {errors.subjectsOfExpertise && (
            <p className="mt-1 text-sm text-red-600">{errors.subjectsOfExpertise.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="yearsOfExperience">
            Years of Experience
          </label>
          <input
            type="number"
            id="yearsOfExperience"
            {...register("yearsOfExperience")}
            min="0"
            max="50"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          />
          {errors.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2">
          Preferred Student Level
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
            <input
              type="checkbox"
              value="earlyYears"
              {...register("preferredStudentLevels")}
              className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
            />
            <span className="ml-2">Early Years</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
            <input
              type="checkbox"
              value="primary"
              {...register("preferredStudentLevels")}
              className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
            />
            <span className="ml-2">Primary</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
            <input
              type="checkbox"
              value="secondary"
              {...register("preferredStudentLevels")}
              className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
            />
            <span className="ml-2">Secondary</span>
          </label>
          <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
            <input
              type="checkbox"
              value="postSecondary"
              {...register("preferredStudentLevels")}
              className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
            />
            <span className="ml-2">Post Secondary</span>
          </label>
        </div>
        {errors.preferredStudentLevels && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredStudentLevels.message}</p>
        )}
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

export default StepAcademicInfo;

