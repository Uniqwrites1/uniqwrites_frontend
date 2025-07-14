import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  servicesType: yup.object({
    homeschool: yup.boolean(),
    homeTutoring: yup.boolean(),
    examPrep: yup.boolean(),
    assignment: yup.boolean()
  }).test("atLeastOne", "Select at least one service type", value => 
    Object.values(value).some(v => v === true)
  ),
  subjectsRequested: yup.string().required("Please specify the subjects needed"),
  preferredMode: yup.string().required("Please select a preferred mode"),
  preferredDays: yup.object().test(
    "atLeastOne",
    "Select at least one preferred day",
    value => Object.values(value).some(v => v === true)
  ),
  durationPerLesson: yup.string().required("Please select lesson duration"),
  preferredLessonTime: yup.string().required("Please select preferred lesson time"),
  startDate: yup.string()
    .required("Start date is required")
    .test("futureDate", "Start date must be in the future", value => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(value) >= today;
    })
});

interface StepStudentTutoringRequirementsProps {
  formData: {
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
  };
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepStudentTutoringRequirements: React.FC<StepStudentTutoringRequirementsProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const handleCheckboxChange = (
    field: "servicesType" | "preferredDays",
    subField: string,
    checked: boolean
  ) => {
    updateFormData(field, {
      ...formData[field],
      [subField]: checked
    });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit(() => onNext())} className="space-y-8">
        {/* Service Types */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">
            What type of tutoring do you need?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
              <input
                type="checkbox"
                {...register("servicesType.homeschool")}
                onChange={(e) => handleCheckboxChange("servicesType", "homeschool", e.target.checked)}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">Homeschool Support</span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
              <input
                type="checkbox"
                {...register("servicesType.homeTutoring")}
                onChange={(e) => handleCheckboxChange("servicesType", "homeTutoring", e.target.checked)}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">Home Tutoring</span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
              <input
                type="checkbox"
                {...register("servicesType.examPrep")}
                onChange={(e) => handleCheckboxChange("servicesType", "examPrep", e.target.checked)}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">Exam Preparation</span>
            </label>
            <label className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
              <input
                type="checkbox"
                {...register("servicesType.assignment")}
                onChange={(e) => handleCheckboxChange("servicesType", "assignment", e.target.checked)}
                className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
              />
              <span className="ml-2">Assignment Help</span>
            </label>
          </div>
          {errors.servicesType && (
            <p className="mt-2 text-sm text-red-600">{errors.servicesType.message}</p>
          )}
        </div>

        {/* Subjects */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Which subjects do you need help with?
          </label>
          <input
            type="text"
            {...register("subjectsRequested")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="e.g., Mathematics, English, Physics, Chemistry"
          />
          {errors.subjectsRequested && (
            <p className="mt-1 text-sm text-red-600">{errors.subjectsRequested.message}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            List all subjects you need assistance with, separated by commas.
          </p>
        </div>

        {/* Preferred Mode */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            How would you like to receive tutoring?
          </label>
          <select
            {...register("preferredMode")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select preferred mode</option>
            <option value="online">Online (Virtual sessions)</option>
            <option value="physical">Physical (In-person sessions)</option>
            <option value="hybrid">Hybrid (Mix of both)</option>
          </select>
          {errors.preferredMode && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredMode.message}</p>
          )}
        </div>

        {/* Preferred Days */}
        <div>
          <label className="block text-sm font-semibold text-black mb-3">
            When are you available for tutoring?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries({
              sunday: "Sunday",
              monday: "Monday",
              tuesday: "Tuesday",
              wednesday: "Wednesday",
              thursday: "Thursday",
              friday: "Friday",
              saturday: "Saturday"
            }).map(([key, label]) => (
              <label key={key} className="flex items-center p-4 border border-gray-300 rounded-md hover:border-[#FFC107] cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  {...register(`preferredDays.${key}`)}
                  onChange={(e) => handleCheckboxChange("preferredDays", key, e.target.checked)}
                  className="w-4 h-4 text-[#FFC107] border-gray-300 rounded focus:ring-[#FFC107]"
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </div>
          {errors.preferredDays && (
            <p className="mt-2 text-sm text-red-600">{errors.preferredDays.message}</p>
          )}
        </div>

        {/* Duration and Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              How long should each session be?
            </label>
            <select
              {...register("durationPerLesson")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            >
              <option value="">Select duration</option>
              <option value="1hour">1 hour</option>
              <option value="1.5hours">1.5 hours</option>
              <option value="2hours">2 hours</option>
              <option value="3hours">3 hours</option>
            </select>
            {errors.durationPerLesson && (
              <p className="mt-1 text-sm text-red-600">{errors.durationPerLesson.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              What time do you prefer?
            </label>
            <input
              type="text"
              {...register("preferredLessonTime")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
              placeholder="e.g., 2:00 PM - 4:00 PM"
            />
            {errors.preferredLessonTime && (
              <p className="mt-1 text-sm text-red-600">{errors.preferredLessonTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              When would you like to start?
            </label>
            <input
              type="date"
              {...register("startDate")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-black mb-2">💡 Tips for Better Learning</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Consistency:</strong> Regular sessions work better than cramming</li>
            <li>• <strong>Environment:</strong> Choose a quiet, well-lit space for learning</li>
            <li>• <strong>Goals:</strong> Be specific about what you want to achieve</li>
            <li>• <strong>Communication:</strong> Don't hesitate to ask questions during sessions</li>
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
      </form>
    </motion.div>
  );
};

export default StepStudentTutoringRequirements;
