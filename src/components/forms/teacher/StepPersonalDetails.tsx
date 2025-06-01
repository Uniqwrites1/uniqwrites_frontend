import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailInput } from "../../common/EmailInput";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string()
    .required("Date of birth is required")
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  phoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  email: yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
});

interface StepPersonalDetailsProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

const StepPersonalDetails: React.FC<StepPersonalDetailsProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [emailValidationState, setEmailValidationState] = useState({ isValid: true, isDuplicate: false });
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const watchedEmail = watch("email");

  const handleEmailValidation = (isValid: boolean, isDuplicate: boolean) => {
    setEmailValidationState({ isValid, isDuplicate });
  };

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
  };  return (
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
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>        <div>
          <EmailInput
            value={watchedEmail || ""}
            onChange={(value) => {
              setValue("email", value);
              updateFormData("email", value);
            }}
            onValidationChange={handleEmailValidation}
            formType="teacher"
            id="email"
            name="email"
            required
            error={errors.email?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="state">
            State of Residence
          </label>          <select
            id="state"
            {...register("state")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select state</option>
            <option value="abia">Abia</option>
            <option value="adamawa">Adamawa</option>
            <option value="akwaibom">Akwa Ibom</option>
            <option value="anambra">Anambra</option>
            <option value="bauchi">Bauchi</option>
            <option value="bayelsa">Bayelsa</option>
            <option value="benue">Benue</option>
            <option value="borno">Borno</option>
            <option value="crossriver">Cross River</option>
            <option value="delta">Delta</option>
            <option value="ebonyi">Ebonyi</option>
            <option value="edo">Edo</option>
            <option value="ekiti">Ekiti</option>
            <option value="enugu">Enugu</option>
            <option value="fct">Federal Capital Territory</option>
            <option value="gombe">Gombe</option>
            <option value="imo">Imo</option>
            <option value="jigawa">Jigawa</option>
            <option value="kaduna">Kaduna</option>
            <option value="kano">Kano</option>
            <option value="katsina">Katsina</option>
            <option value="kebbi">Kebbi</option>
            <option value="kogi">Kogi</option>
            <option value="kwara">Kwara</option>
            <option value="lagos">Lagos</option>
            <option value="nasarawa">Nasarawa</option>
            <option value="niger">Niger</option>
            <option value="ogun">Ogun</option>
            <option value="ondo">Ondo</option>
            <option value="osun">Osun</option>
            <option value="oyo">Oyo</option>
            <option value="plateau">Plateau</option>
            <option value="rivers">Rivers</option>
            <option value="sokoto">Sokoto</option>
            <option value="taraba">Taraba</option>
            <option value="yobe">Yobe</option>
            <option value="zamfara">Zamfara</option>
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="address">
          Residential Address
        </label>
        <textarea
          id="address"
          {...register("address")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="Enter your residential address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>      <div className="flex justify-end pt-4">
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

export default StepPersonalDetails;

