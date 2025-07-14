import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEmailValidation } from "../../../hooks/useEmailValidation";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required").min(2, "Full name must be at least 2 characters"),
  age: yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Age is required")
    .min(10, "You must be at least 10 years old")
    .max(25, "You must be 25 years old or younger"),
  phoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,14}$/, "Phone number must be 10-14 digits"),
  emailAddress: yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  residentialAddress: yup.string().required("Address is required"),
  stateOfResidence: yup.string().required("State is required"),
  emergencyContact: yup.string().required("Emergency contact name is required"),
  emergencyContactPhone: yup.string()
    .required("Emergency contact phone is required")
    .matches(/^[0-9]{10,14}$/, "Emergency contact phone must be 10-14 digits")
});

interface StepStudentPersonalInfoProps {
  formData: {
    fullName: string;
    age: number;
    phoneNumber: string;
    emailAddress: string;
    residentialAddress: string;
    stateOfResidence: string;
    emergencyContact: string;
    emergencyContactPhone: string;
  };
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

const StepStudentPersonalInfo: React.FC<StepStudentPersonalInfoProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [emailValidationState, setEmailValidationState] = useState({ isValid: true, isDuplicate: false });
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const watchedEmailAddress = watch("emailAddress");

  const handleEmailValidation = (isValid: boolean, isDuplicate: boolean) => {
    setEmailValidationState({ isValid, isDuplicate });
  };

  useEmailValidation(
    watchedEmailAddress,
    setValue,
    handleEmailValidation
  );

  const handleFormSubmit = (data: any) => {
    // Check email validation before proceeding
    if (!emailValidationState.isValid || emailValidationState.isDuplicate) {
      console.log('❌ Cannot proceed: Email validation failed');
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
      updateFormData(key, value);
    });
    onNext();
  };

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
    "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
    "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"
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
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register("age")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your age"
            min="10"
            max="25"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="e.g., 08012345678"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="emailAddress">
            Email Address
          </label>
          <input
            type="email"
            id="emailAddress"
            {...register("emailAddress")}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
              !emailValidationState.isValid || emailValidationState.isDuplicate
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[#FFC107]'
            }`}
            placeholder="Enter your email address"
          />
          {errors.emailAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.emailAddress.message}</p>
          )}
          {emailValidationState.isDuplicate && (
            <p className="mt-1 text-sm text-red-600">This email is already registered. Please use a different email.</p>
          )}
          {!emailValidationState.isValid && watchedEmailAddress && (
            <p className="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="residentialAddress">
          Residential Address
        </label>
        <textarea
          id="residentialAddress"
          {...register("residentialAddress")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="Enter your full residential address"
          rows={3}
        />
        {errors.residentialAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.residentialAddress.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="stateOfResidence">
          State of Residence
        </label>
        <select
          id="stateOfResidence"
          {...register("stateOfResidence")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
        >
          <option value="">Select your state</option>
          {nigerianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.stateOfResidence && (
          <p className="mt-1 text-sm text-red-600">{errors.stateOfResidence.message}</p>
        )}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-black mb-4">Emergency Contact Information</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please provide an emergency contact (parent, guardian, or trusted adult) who can be reached if needed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2" htmlFor="emergencyContact">
              Emergency Contact Name
            </label>
            <input
              type="text"
              id="emergencyContact"
              {...register("emergencyContact")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
              placeholder="Full name of emergency contact"
            />
            {errors.emergencyContact && (
              <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2" htmlFor="emergencyContactPhone">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              id="emergencyContactPhone"
              {...register("emergencyContactPhone")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
              placeholder="e.g., 08012345678"
            />
            {errors.emergencyContactPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={!emailValidationState.isValid || emailValidationState.isDuplicate}
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            !emailValidationState.isValid || emailValidationState.isDuplicate
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#FFC107] text-black hover:bg-[#FFD700] focus:ring-[#FFC107]'
          }`}
        >
          Next Step
        </button>
      </div>
    </motion.form>
  );
};

export default StepStudentPersonalInfo;
